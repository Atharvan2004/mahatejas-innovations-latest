import Navbar from "@/components/common/Navbar";
import LandingBanner from "@/components/home/LandingBanner";
import ProductGrid from "@/components/home/ProductGrid";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <LandingBanner />
      <div className="w-screen">
        <ProductGrid />
      </div>
      <Footer />
    </>
  );
}
