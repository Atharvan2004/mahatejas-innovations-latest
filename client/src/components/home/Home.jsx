import Navbar from "@/components/common/Navbar";
import LandingBanner from "@/components/home/LandingBanner";
import Footer from "@/components/common/Footer";
import { CardDefault } from "../common/HomeCard";

export default function Home() {
  return (
    <>
      <Navbar />
      <LandingBanner />
      <div className="container mx-auto px-4 mb-5">
        <h2 className="scroll-m-20 text-center border-b mt-5 pb-2 md:text-3xl font-semibold tracking-tight first:mt-0">
          Our Product Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="text-center">
            <h2 className="">Airplane</h2>
            <CardDefault
              title="MTI 3515 High Efficiency Motor 340KV / 480KV"
              price="₹ 1880"
              to = "category/Airplane/0"
            />
          </div>
          <div className="text-center">
            <h2 className="">Multi Motor</h2>
            <CardDefault
              title="MTI 4005 High Efficiency Motor 240KV"
              price="₹ 2220"
              to = "category/Multimotor/0"
            />
          </div>
          <div className="text-center">
            <h2 className="">Propeller</h2>
            <CardDefault
              title="MTI 5015 High Efficiency Motor 480KV"
              price="₹ 2897"
              to = "category/Propeller/0"
            />
          </div>
          <div className="text-center">
            <h2 className="">ESC</h2>
            <CardDefault
              title="MTI 4010 High Efficiency Motor 270KV"
              price="₹ 2420"
              to = "category/Esc/0"
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
