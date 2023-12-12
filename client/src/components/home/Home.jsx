import Navbar from "@/components/common/Navbar";
import LandingBanner from "@/components/home/LandingBanner";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <LandingBanner />
      <div className="container w-screen">
        <h2 className="scroll-m-20 text-center border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Our Manufacturing Process
        </h2>
        <iframe
          allow="fullscreen;"
          className="aspect-video w-full mb-10"
          src="https://www.youtube.com/embed/tgbNymZ7vqY?playlist=tgbNymZ7vqY&loop=1"
        ></iframe>
      </div>
      <Footer />
    </>
  );
}
