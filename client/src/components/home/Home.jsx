import Navbar from "@/components/common/Navbar";
import LandingBanner from "@/components/home/LandingBanner";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <LandingBanner />
      <div className="container w-screen">
        <h2 className="scroll-m-20 text-center border-b mt-5 pb-2 md:text-3xl font-semibold tracking-tight first:mt-0">
          Our Manufacturing Process
        </h2>
        <iframe
          className="w-full mb-5 aspect-video"
          src="https://www.youtube.com/embed/2YBtspm8j8M"
          title="This Is a Generic Brand Video, by Dissolve"
          allow="fullscreen"
        ></iframe>
      </div>
      <Footer />
    </>
  );
}
