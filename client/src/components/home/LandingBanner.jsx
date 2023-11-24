import LandingImg from "@/assets/images/landing.jpg";
import clsx from "clsx";
import { useState, useEffect } from "react";

export default function LandingBanner() {
  const imgArr = [
    "https://i.imgur.com/uqAvg2h.jpg",
    "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1527441385177-3dad16222699?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1577533870320-2c31e7e41028?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  const [currImg, setCurrImg] = useState(0);

  function nxtImg() {
    currImg === imgArr.length - 1
      ? setCurrImg(0)
      : setCurrImg((prev) => prev + 1);
  }
  function prevImg() {
    currImg === 0
      ? setCurrImg(imgArr.length - 1)
      : setCurrImg((prev) => prev - 1);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      currImg === imgArr.length - 1? setCurrImg(0) : setCurrImg(prev => prev + 1)
    }, 5000);
    return () => clearInterval(interval);
  }, [imgArr.length,currImg]);

  return (
    <div className="relative mx-auto mb-5 w-full max-w-[1600px] px-5">
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
      {/* img carousel */}
      <button
        className="w-10 h-10 absolute bottom-0 md:top-0 right-5 bg-slate-800 bg-opacity-50 flex justify-center items-center"
        onClick={nxtImg}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-6 h-6"
        >
          <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
        </svg>
      </button>
      <button
        className="w-10 h-10 absolute bottom-0 md:top-0 right-[3.75rem] bg-slate-800 bg-opacity-50 flex justify-center items-center"
        onClick={prevImg}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-6 h-6"
        >
          <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
        </svg>
      </button>
      <img
        src={imgArr[currImg]}
        alt="Landing"
        className={clsx(
          "h-[40vh] w-full object-cover",
          "md:absolute md:right-5 md:top-0 md:-z-10 md:h-[80vh] md:w-4/5",
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
