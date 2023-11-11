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

      {/* go down button */}
      <a
        href="#product-grid"
        className="absolute -bottom-3 right-3 bg-[rgba(0,0,0,0.2)] px-9 py-10 backdrop-blur-md lg:-bottom-4 lg:-right-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={6.5}
          stroke="currentColor"
          className="fixed left-7 top-8 h-6 w-6 animate-bounce text-xl text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
          />
        </svg>
      </a>
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
