import Navbar from "@/components/common/Navbar";
import LandingBanner from "@/components/home/LandingBanner";
import Footer from "@/components/common/Footer";
import { useState, useEffect } from "react";
import AddKv from "../admin/product/AddKv";
import ImgUpload from "../common/ImgUpload";

export default function Home() {
  return (
    <>
      <Navbar />
      <AddKv />
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
    "https://i.imgur.com/1u6NY7ls.jpg",
    "https://i.imgur.com/tJcPgxLs.jpg",
    "https://i.imgur.com/sWeXAOPs.jpg",
    "https://i.imgur.com/vqFUZbss.jpg",
    "https://i.imgur.com/CnVpUnKs.png",
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
