import Image from "next/image";

export function LaptopShowcase() {
  return (
    <div className="relative h-[650px] w-full">
      <Image
        src="/hero.png"
        alt="MacBook showing DevLog code on a rock"
        fill
        priority
        sizes="(max-width: 1024px) 90vw, 1000px"
        className="object-contain object-bottom"
      />
    </div>
  );
}