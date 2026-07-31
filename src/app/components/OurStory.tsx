import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const story = {
  country: "MALAYSIA",
  year: "2015",
  title: "The region started paying attention.",
  description:
    "Just months after launching in Singapore, demand from across the Causeway was impossible to ignore. OSTSOME Malaysia became StreamCast Asia's first step beyond its home market—same curation philosophy, same community of enthusiasts, a new home for the same obsession with getting it first. Discover the latest technology, return for upgrades, repairs, or simply to see what's just arrived. Join our events, talks, and hands-on experiences where the community comes alive. And if you're a FOST member? Every interaction becomes even more rewarding. This is tech, done right.",
  image:
    "https://images.unsplash.com/photo-1780342726315-9fda9110450d?fm=jpg&q=60&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0"
};

export function OurStory() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-900" style={{ height: '520px' }}>
      <div className="absolute inset-0">
        <ImageWithFallback
          src={story.image}
          alt={story.country}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">
            Our Story
          </h2>
          <p className="text-white/50 text-sm md:text-base">
            Curating tomorrow's technology, today.
          </p>
        </div>

        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-bold tracking-widest text-white uppercase">
              {story.country}
            </span>
            <span className="text-[#F16C10] font-bold">—</span>
            <span className="text-xs font-bold text-[#F16C10]">
              {story.year}
            </span>
          </div>

          <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            {story.title}
          </h3>

          <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6 max-w-xl">
            {story.description}
          </p>
        </div>
      </div>
    </section>
  );
}