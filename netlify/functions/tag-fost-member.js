// netlify/functions/tag-fost-member.js
//
// Tags a Shopify customer as a FOST member right after signup. This has to
// go through the Admin API — the Storefront API's customerCreate mutation
// (used in shopify.ts customerRegister) has no `tags` field at all, so
// there's currently no way for the signup flow itself to mark a customer
// as FOST. This function closes that gap.
//
// Call this immediately after a successful customerRegister() call on the
// front end, passing the customer's email (Storefront API's customerCreate
// only returns { id, email } — the numeric Admin customer ID isn't
// available client-side, so this looks the customer up by email first).

const SHOPIFY_STORE_DOMAIN = '3e43e4-81.myshopify.com';
const ADMIN_API_VERSION = '2024-04';

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const { email } = JSON.parse(event.body || '{}');
  if (!email) {
    return { statusCode: 400, body: JSON.stringify({ error: 'email is required' }) };
  }

  const adminToken = process.env.SHOPIFY_ADMIN_TOKEN;
  const adminUrl = `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${ADMIN_API_VERSION}/graphql.json`;

  try {
    // Look up the customer's Admin API GID by email — Storefront API
    // doesn't expose it, so we have to search for it here.
    const searchRes = await fetch(adminUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      body: JSON.stringify({
        query: `
          query FindCustomer($query: String!) {
            customers(first: 1, query: $query) {
              edges { node { id tags } }
            }
          }
        `,
        variables: { query: `email:${email}` },
      }),
    });
    const searchJson = await searchRes.json();
    const customer = searchJson?.data?.customers?.edges?.[0]?.node;

    if (!customer) {
      return { statusCode: 404, body: JSON.stringify({ error: 'Customer not found — search may have run before Shopify indexed the new account. Retry after a short delay.' }) };
    }

    if (customer.tags?.includes('fost-member')) {
      return { statusCode: 200, body: JSON.stringify({ success: true, alreadyTagged: true }) };
    }

    const newTags = [...(customer.tags || []), 'fost-member'];

    const updateRes = await fetch(adminUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminToken,
      },
      body: JSON.stringify({
        query: `
          mutation TagCustomer($input: CustomerInput!) {
            customerUpdate(input: $input) {
              customer { id tags }
              userErrors { field message }
            }
          }
        `,
        variables: { input: { id: customer.id, tags: newTags } },
      }),
    });
    const updateJson = await updateRes.json();
    const errors = updateJson?.data?.customerUpdate?.userErrors || [];

    if (errors.length > 0) {
      return { statusCode: 500, body: JSON.stringify({ error: errors.map(e => e.message).join(', ') }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
