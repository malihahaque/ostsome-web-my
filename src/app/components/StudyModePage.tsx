import { ChevronLeft, Headphones, Search } from 'lucide-react';
import type { Product } from '../data/products';
import { useProducts } from '../hooks/useProducts';
import { ProductCard } from './ProductCard';

const STUDY_MODE_VENDORS = ['sennheiser', 'skullcandy'];

type Props = {
  onBack?: () => void;
  onSelectProduct?: (product: Product) => void;
};

export function StudyModePage({ onBack, onSelectProduct }: Props) {
  const { products, loading } = useProducts();

  const studyProducts = products.filter(p =>
    STUDY_MODE_VENDORS.includes(p.vendor.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-neutral-600 hover:text-[#F16C10] transition-colors mb-6"
      >
        <ChevronLeft size={16} />
        Back
      </button>

      <div className="flex items-center gap-3 mb-2">
        <Headphones className="text-neutral-400" size={28} />
        <h1 className="text-3xl md:text-4xl font-bold text-black uppercase">Mobile Audio</h1>
      </div>
      <p className="text-neutral-600 mb-1">Earbuds and headphones for music, calls and everything in between.</p>
      <p className="text-sm text-neutral-400 mb-8">{studyProducts.length} products</p>

      <div className="border-t border-neutral-100 pt-8">
        {loading ? (
          <div className="text-center py-20 text-neutral-400">Loading products…</div>
        ) : studyProducts.length === 0 ? (
          <div className="text-center py-20">
            <Search className="mx-auto text-neutral-300 mb-4" size={40} />
            <p className="font-semibold text-black mb-1">Coming soon</p>
            <p className="text-sm text-neutral-400">We're adding more products to this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {studyProducts.map(product => (
              <ProductCard
                key={product.handle}
                product={product}
                onClick={() => onSelectProduct?.(product)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
