import Navbar from "@/components/common/Navbar";
import AboutImg from "@/assets/images/about.jpg";
import ImgCollage from "@/components/siteInfo/about/ImgCollage";
import Footer from "@/components/common/Footer";

export default function About() {
  return (
    <div>
      <Navbar />
      <div className="relative mb-10">
        <div className="absolute bottom-4 w-full bg-[rgba(0,0,0,0.5)] px-4 py-5 backdrop-blur-md lg:bottom-20 lg:px-20">
          <h1 className="text-4xl font-bold text-white lg:text-5xl">
            Mahatejas Innovative
          </h1>
          <h2 className="text-white lg:text-xl">
            Machinery India Pvt Ltd (MTI)
          </h2>
        </div>
        <img
          src={AboutImg}
          alt="About"
          className="h-[40vh] w-full object-cover lg:h-[60vh]"
        />
      </div>
      <div className="mx-auto max-w-6xl px-5 lg:my-10 lg:scale-105">
        {/* About Us */}
        <h1>About Us</h1>
        <p>
          <b>Mahatejas Innovative Machinery India Pvt Ltd (MTI)</b> is a
          Gwalior, Madhya Pradesh based Indian company, providing propulsion
          system solution for UAV with advanced technology, specializing in
          manufacturing and designing of brushless motors, ESCs (Electronic
          Speed Controller) and propellers, we are also providing aerial
          photography, industrial, agricultural, and commercial applications
          drones. Our products obtain high reputation due to strict quality
          assurance and quality control.
        </p>
        <p>
          <b>Our value:</b> The Cheaper and Safer Propulsion System
        </p>
        <p className="mb-8">
          <b>Our vision:</b> To computer the global Drone Market and to provide
          Make in India components
        </p>

        {/* Our Departments */}
        <h1>Our Departments</h1>
        <p>
          <b>R&D Department:</b> We do research and development to keep
          ourselves updated and develop more reliable and high efficiency
          propulsion system
        </p>
        <p className="mb-8">
          <b>Quality Check Department:</b> We carry out inspection in each
          process of manufacturing and assembly to that of the finished product
          to make sure that impeccable products reach our customers.
        </p>

        {/* Our Journey */}
        <h1>Our Journey</h1>
        <p className="mb-8">
          <b>Mahatejas Innovative Machinery India Pvt Ltd (MTI)</b> was founded
          by <b>Mr. Anoop Rathore</b> who is already in this field since 2012
          and till year 2020 he gradually realized that India is facing issues
          in importing drone components from China and other nations, and also
          it will be a great support to Make in India campaign, a dream of our
          honorable Prime Minister Mr. Narendra Modi, his vision laid the
          foundation of
          <b>Mahatejas Innovative Machinery India Private Limited </b>to
          manufacture drone components in India.
        </p>

        <div className="w-full lg:flex">
          <div className="lg:w-3/5">
            {/* Our Products */}
            <h1>Our Products</h1>
            <p>For now, we are manufacturing following Drone components:</p>
            <ul className="my-3 ml-5">
              <li>- Brushless motors</li>
              <li>- Brushless ESCs</li>
              <li>- Propellers</li>
              <li>- Drone frames</li>
            </ul>
            <p className="my-5">
              We are expert in design and test flight and adopt innovative
              technology for products of high quality.
            </p>
            <h4 className="my-3">Motor series available at MTI:</h4>
            <p>
              <b>
                H-Series: H –Series Propulsion system used to power Heavy lift
                drones mention below:
              </b>
            </p>
            <ul className="my-3 ml-5">
              <li>- Human carrying drone</li>
            </ul>
            <p>
              <b>
                M-Series: M –Series Propulsion system used to power to following
                category:
              </b>
              <ul className="my-3 ml-5">
                <li>- Agriculture spraying Drone</li>
                <li>- Delivery Drone</li>
              </ul>
            </p>
            <p>
              <b>
                L-Series: L –Series Propulsion system used to power to following
                category:
              </b>
              <ul className="my-3 ml-5">
                <li>- Surveillance Drones</li>
                <li>- Videography Drones</li>
                <li>- Training Drones</li>
              </ul>
            </p>
          </div>
          <ImgCollage />
        </div>
      </div>
      <Footer />
    </div>
  );
}
