import LandingImg from "@/assets/images/landing.jpg";
import clsx from "clsx";

export default function LandingBanner() {
  return (
    <div className="relative mx-auto mb-16 w-full max-w-[1600px] px-5">
      {/* dotted decoration */}
      <div className={clsx("absolute right-4", "md:left-24 md:top-12")}>
        <DotPattern />
      </div>
      {/* text card */}
      <div className="flex h-[35vh] flex-col justify-end px-6 md:h-[85vh] md:justify-center">
        <div className="mb-8 md:w-[430px] md:bg-[rgba(255,255,255,0.4)] md:px-6 md:py-12 md:backdrop-blur-md">
          <h2 className="">Welcome To</h2>
          <h1 className="text-4xl font-semibold md:text-5xl">
            MAHATEJAS INNOVATIONS
          </h1>
          <p className="font-light">We are OEM manufacturer of India</p>
        </div>
      </div>
      {/* image */}
      <img
        src={LandingImg}
        alt="Landing"
        className={clsx(
          "h-[40vh] w-full object-cover",
          "md:absolute md:right-5 md:top-0 md:-z-10 md:h-[85vh] md:w-4/5",
        )}
      />
    </div>
  );
}
function DotPattern() {
  const elementToRender = (
    <div className="mb-2 h-1 w-1 rounded-full bg-slate-700 md:mb-3"></div>
  );

  const elements = Array.from({ length: 56 }, (value, index) => (
    <div key={index}>{elementToRender}</div>
  ));
  return (
    <div className="md:grid-colos-7 grid w-28 grid-cols-8 md:w-24">
      {elements}
    </div>
  );
}
