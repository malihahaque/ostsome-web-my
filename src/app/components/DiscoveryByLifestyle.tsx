import { BookOpen, Compass, Home } from 'lucide-react';
import studyImg from '../../imports/image-4.png';
import travelImg from '../../imports/Travel category.png';
import smartHomeImg from '../../imports/Smart home category.png';

const lifestyles = [
  {
    id: 1,
    title: 'Study Mode',
    description: 'Focus in. Block out the noise.',
    icon: BookOpen,
    image: studyImg,
    products: '9 products',
    page: 'study-mode' as const,
  },
  {
    id: 2,
    title: 'Travel Ready',
    description: 'Pack light. Go far.',
    icon: Compass,
    image: travelImg,
    products: '29 products',
    page: 'travel-ready' as const,
  },
  {
    id: 3,
    title: 'Smart Home',
    description: 'Your space, automated.',
    icon: Home,
    image: smartHomeImg,
    products: '8 products',
    page: 'smart-home' as const,
  },
];

type LifestylePage = 'study-mode' | 'travel-ready' | 'smart-home';

type Props = {
  onNavToLifestylePage?: (page: LifestylePage) => void;
};

export function DiscoveryByLifestyle({ onNavToLifestylePage }: Props) {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6 md:mb-10 text-left md:text-center">
          <h2 className="text-[26px] md:text-4xl font-bold text-black mb-2">Discovery by Lifestyle</h2>
          <p className="text-[14px] md:text-base text-neutral-600">Your setup. Your rules. Your vibe.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {lifestyles.map((lifestyle) => {
            const Icon = lifestyle.icon;
            return (
              <div
                key={lifestyle.id}
                onClick={() => onNavToLifestylePage?.(lifestyle.page)}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
              >
                <div className="relative h-[300px] md:h-[380px] bg-neutral-100 overflow-hidden">
                  <img
                    src={lifestyle.image}
                    alt={lifestyle.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.objectFit = 'contain';
                      (e.target as HTMLImageElement).style.padding = '2rem';
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mb-4 group-hover:bg-[#F16C10] transition">
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">{lifestyle.title}</h3>
                  <p className="text-white/90 text-sm mb-3">{lifestyle.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-xs">{lifestyle.products}</span>
                    <span className="text-white text-sm font-medium group-hover:translate-x-1 transition">Explore →</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}