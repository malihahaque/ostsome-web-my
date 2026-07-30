import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import matadorBanner from "../../imports/Matador Banner.png";
import sennheiserBanner from "../../imports/Sennheiser Banner.png";
import skullcandyBanner from "../../imports/Skullcandy Banner.png";
import therabodyBanner from "../../imports/Therabody Banner.png";

const banners = [matadorBanner, sennheiserBanner, skullcandyBanner, therabodyBanner];

type HeroProps = {
  onNavToAllProducts: () => void;
  onNavToHeshAnc: () => void;
  onNavToFostSignup: () => void;
  onNavToClearance: () => void;
  onNavToLooki: () => void;
};

export function Hero({
  onNavToAllProducts,
}: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // TODO: swap these once brand landing pages / collection links are decided.
  // All 4 banners currently point at All Products as a placeholder.
  const bannerActions = [
    onNavToAllProducts,
    onNavToAllProducts,
    onNavToAllProducts,
    onNavToAllProducts,
  ];
  const bannerLabels = [
    "Matador",
    "Sennheiser",
    "Skullcandy",
    "Therabody",
  ];

  const goToSlide = (index: number) => setCurrentSlide(index);
  const goToPrevious = () =>
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  const goToNext = () =>
    setCurrentSlide((prev) => (prev + 1) % banners.length);

  // Auto-cycle every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-neutral-900 group w-full">
      <div className="relative w-full aspect-[3/1] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === currentSlide
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <button
              onClick={bannerActions[index]}
              className="block w-full h-full cursor-pointer relative"
              aria-label={`Go to ${bannerLabels[index]}`}
            >
              <ImageWithFallback
                src={banner}
                alt={`Hero banner ${index + 1}`}
                className="w-full h-full object-cover object-center"
              />
            </button>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition md:opacity-0 md:group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition md:opacity-0 md:group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="h-11 min-w-[44px] flex items-center justify-center"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`block h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 w-2 hover:bg-white/75"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}