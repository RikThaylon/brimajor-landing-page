import Image from "next/image";

export function BrandWatermark({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none -z-10 ${className}`}>
      <Image
        src="/hero-bg.jpg"
        alt=""
        width={400}
        height={400}
        className="absolute -right-20 -top-20 w-80 h-80 object-contain opacity-[0.03] mix-blend-lighten rotate-12 select-none"
        aria-hidden="true"
      />
    </div>
  );
}
