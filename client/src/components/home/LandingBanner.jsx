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
    <div className="relative -top-10">
      <button
        className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center bg-slate-800 bg-opacity-50"
        onClick={nxtImg}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="h-5 w-5"
        >
          <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
        </svg>
      </button>
      <button
        className="absolute bottom-0 right-[2rem] flex h-8 w-8 items-center justify-center bg-slate-800 bg-opacity-50"
        onClick={prevImg}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="h-5 w-5"
        >
          <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
        </svg>
      </button>
      <img
        src={imgArr[currImg]}
        alt="Landing"
        className={"h-[180px] md:h-[600px] w-screen object-cover"} />
    </div>
  );
}
