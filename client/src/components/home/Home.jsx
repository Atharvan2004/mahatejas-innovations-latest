import Navbar from "@/components/common/Navbar";
import LandingBanner from "@/components/home/LandingBanner";
import Footer from "@/components/common/Footer";
import { useState, useEffect } from "react";

export default function Home() {
  return (
    <>
      <Navbar />
      <LandingBanner />
      <div className="w-screen">
        <Gallery />
      </div>
      <Footer />
    </>
  );
}

function Gallery() {
  const imgArr = [
    "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://i.imgur.com/uqAvg2h.jpg",
    "https://images.unsplash.com/photo-1527441385177-3dad16222699?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1577533870320-2c31e7e41028?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://i.imgur.com/uqAvg2h.jpg",
    "https://images.unsplash.com/photo-1527441385177-3dad16222699?q=80&w=2060&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1577533870320-2c31e7e41028?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];
  const imgCap = [
    "Caption 1",
    "Caption 2",
    "Caption 3",
    "Caption 4",
    "Caption 5",
    "Caption 6",
    "Caption 7",
    "Caption 8",
  ];
  const [currImg, setCurrImg] = useState(0);

  function nxtImg() {
    setCurrImg((prev) => (prev + 1) % imgArr.length);
  }
  function prevImg() {
    setCurrImg((prev) => (prev - 1) % imgArr.length);
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     currImg === imgArr.length - 1 ? setCurrImg(0) : setCurrImg(prev => prev + 1)
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, [imgArr.length, currImg]);

  return (
    <>
      <h1 className="text-center text-sm mb-2 md:text-3xl">Our Manufacturing Process</h1>
      <div className="relative">
        <div className="mySlides">
          <img
            src={imgArr[currImg]}
            className="w-screen h-[220px] md:h-[85vh] object-cover"
          />
        </div>

        <button
          className="md:w-10  w-5 h-10 absolute top-1/2 bg-slate-800 bg-opacity-50 text-white flex justify-center items-center"
          onClick={prevImg}
        >
          &#10094;
        </button>
        <button
          className="w-5 h-10 md:w-10 absolute top-1/2 right-0 text-white bg-slate-800 bg-opacity-50 flex justify-center items-center"
          onClick={nxtImg}
        >
          &#10095;
        </button>
      </div>
      <div className="mb-10">
        <p className="bg-col text2-col md:py-3 py-1 md:text-xl text-sm text-center">
          {imgCap[currImg]}
        </p>
      </div>
    </>
  );
}
