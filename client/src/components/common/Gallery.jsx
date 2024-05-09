import { Typography } from "@material-tailwind/react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Gallery() {
  return (
    <>
      <div>
        <Navbar />
        <div className="h-screen">
          <Typography variant="h2" className=" text-black text-center">Our Achievements</Typography>
          
        </div>
        <Footer />
      </div>
    </>
  );
}
