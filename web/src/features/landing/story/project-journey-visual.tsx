import Image from "next/image";

export function ProjectJourneyVisual() {
  return (
    <div className="relative h-[560px] w-full lg:h-[680px]">
      <Image
        src="/project-journey.png"
        alt="DevLog project journey from first commit to shipped product"
        fill
        sizes="(max-width: 1024px) 90vw, 700px"
        className="object-contain"
      />
    </div>
  );
}