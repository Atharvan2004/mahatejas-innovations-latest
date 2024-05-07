import Navbar from "@/components/common/Navbar";
import LandingBanner from "@/components/home/LandingBanner";
import Footer from "@/components/common/Footer";
import { CardDefault } from "../common/HomeCard";

export default function Home() {
  return (
    <>
      <Navbar />
      <LandingBanner />
      <div className="container w-screen">
        <h2 className="scroll-m-20 text-center border-b mt-5 pb-2 md:text-3xl font-semibold tracking-tight first:mt-0">
          Our Manufacturing Process
        </h2>
        <div className="w-4/5 mx-auto">
          <div className="flex mb-5 mt-8">
            <CardDefault/>
            <CardDefault/>
          </div>
          <div className="flex mb-5">
            <CardDefault />
            <CardDefault />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
