'use client';

type BannerProps = {
  title: string;
  backgroundImage: string; // image path passed via props
};

export default function Banner({ title, backgroundImage }: BannerProps) {
  return (
    <div
      className="relative  flex items-center justify-center text-white text-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[50px]" />
      <h1 className="relative text-4xl font-bold font-monument tracking-[4px] uppercase z-10 pt-40 pb-24">
        {title}
      </h1>
    </div>
  );
}
