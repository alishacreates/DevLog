import Image from "next/image";

export function BuildLoopVisual() {
  return (
    <div className="relative h-[420px] w-full sm:h-[520px] lg:h-[650px]">
      <Image
        src="/build-loop.png"
        alt="Build, log, share and repeat development cycle"
        fill
        sizes="(max-width: 1024px) 95vw, 1000px"
        className="object-contain"
      />
    </div>
  );
}