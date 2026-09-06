import Image from "next/image";

export function LaptopShowcase() {
  return (
    <div className="relative h-[300px] w-full sm:h-[690px]">
      <Image
        src="/hero.png"
        alt="MacBook showing DevLog code on a rock"
        fill
        priority
        sizes="(max-width: 640px) 118vw, (max-width: 1024px) 95vw, 1200px"
        className="object-contain object-bottom"
      />
    </div>
  );
}