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
    "https://i.imgur.com/uqAvg2h.jpg",
    "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     currImg === imgArr.length - 1 ? setCurrImg(0) : setCurrImg(prev => prev + 1)
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, [imgArr.length, currImg]);

  return (
    <>
      <h1 className="text-center">Our Gallery</h1>
      <div className="container relative">
        <div className="mySlides">
          <div className="numbertext">1 / 6</div>
          <img
            src={imgArr[currImg]}
            className="w-full aspect-video object-cover"
          />
        </div>

        <button
          className="md:w-10  w-5 h-10 absolute top-1/2 bg-slate-800 bg-opacity-50 text-white flex justify-center items-center"
          onClick={prevImg}
        >
          &#10094;
        </button>
        <button
          className="w-5 h-10 md:w-10 absolute top-1/2 right-8 text-white bg-slate-800 bg-opacity-50 flex justify-center items-center"
          onClick={nxtImg}
        >
          &#10095;
        </button>
      </div>
      <div className="container">
        <p className="bg-[#222222] md:py-3 py-1 md:text-xl font-bold text-center text-white">
          {imgCap[currImg]}
        </p>
      </div>
      <div className="container grid md:grid-cols-7 grid-cols-3 mb-5">
        {imgArr.map((img, index) => (
          <div key={index} className="column">
            <img
              className="w-full aspect-video object-cover"
              onClick={() => setCurrImg(index)}
              src={img}
              alt="The Woods"
            />
          </div>
        ))}
      </div>
    </>
  );
}
