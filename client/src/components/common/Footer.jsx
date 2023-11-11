import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-black px-5 pt-16">
      <div className="max-w-6xl lg:mx-auto lg:flex">
        {/* Quick links */}
        <div className="mb-8 flex flex-col md:w-1/3">
          <h5 className=" text-white">Quich Links</h5>
          <Link to="/me" className="text-white">
            My Account
          </Link>
          <Link to="/refund-return-policy" className="text-white">
            Refund and Return Policy
          </Link>
          <Link to="/privacy-policy" className="text-white">
            Privacy Policy
          </Link>
          <Link to="/about" className="text-white">
            About Us
          </Link>
          <Link to="/contact" className="text-white">
            Contact Us
          </Link>
        </div>
        {/* Contact */}
        <div className="mb-8 md:w-1/3">
          <h5 className="text-[#efefef]">CONTACTS</h5>
          <a href="tel:+919109552446">
            <p className="mb-4 text-[#efefef]">+91 9109552446</p>
          </a>
          <a href="mailto:Contact@mahatejasinnovations.com">
            <p className="text-[#efefef]">Contact@mahatejasinnovations.com</p>
          </a>
          <a href="mailto:Sales@mahatejasinnovations.com">
            <p className="text-[#efefef]">Sales@mahatejasinnovations.com</p>
          </a>
          <a href="mailto:Support@mahatejasinnovations.com ">
            <p className="text-[#efefef]">Support@mahatejasinnovations.com </p>
          </a>
        </div>
        {/* Address */}
        <div className="md:w-1/3">
          <h5 className="text-[#efefef]">ADDRESS</h5>
          <p className="text-[#efefef]">
            ABV-IIITM Pocket B campus Morena Link Road
          </p>
          <p className="text-[#efefef]">Gwalior, Madhyja Pradesh 474015</p>
        </div>
      </div>

      {/* social icons */}
      <div className="lg:ml-1/3 mb-8 mt-8 flex max-w-6xl pl-4 lg:mx-auto lg:mt-4 lg:pl-14">
        <i
          className={`${styles.social_icons} text-[#efefef] nf nf-cod-twitter lg:ml-[30%]`}
        ></i>
        <i
          className={`${styles.social_icons} text-[#efefef] nf nf-fa-facebook_square`}
        ></i>
        <i
          className={`${styles.social_icons} text-[#efefef] nf nf-fa-instagram`}
        ></i>
      </div>
      <div className="mx-auto max-w-7xl py-5 pl-3 lg:pl-16">
        Copyright © Mahatejas Innovations 2023
      </div>
    </div>
  );
}
const styles = {
  social_icons: "mr-8 text-xl",
};
