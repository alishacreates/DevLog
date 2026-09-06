import Image from "next/image";

export function ChecklistVisual() {
  return (
    <div className="relative h-[420px] w-full sm:h-[480px] lg:h-[540px]">
      <Image
        src="/checklist.png"
        alt="Checklist showing the work behind developer progress"
        fill
        sizes="(max-width: 1024px) 80vw, 500px"
        className="object-contain"
      />
    </div>
  );
}