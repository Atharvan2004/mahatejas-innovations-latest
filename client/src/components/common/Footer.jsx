import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-black px-5 pt-16">
      <div className="max-w-6xl lg:mx-auto lg:flex">
        {/* Quick links */}
        <div className="mb-8 flex flex-col md:w-1/3">
          <h5 className="text2-col">Quick Links</h5>
          <Link to="/me" className="link-col">
            My Account
          </Link>
          <Link to="/refund-return-policy" className="link-col">
            Refund and Return Policy
          </Link>
          <Link to="/privacy-policy" className="link-col">
            Privacy Policy
          </Link>
          <Link to="/about" className="link-col">
            About Us
          </Link>
          <Link to="/contact" className="link-col">
            Contact Us
          </Link>
        </div>
        {/* Contact */}
        <div className="mb-8 md:w-1/3">
          <h5 className="text2-col">CONTACTS</h5>
          <a href="tel:+919109552446">
            <p className="mb-4 link-col">+91 9109552446</p>
          </a>
          <a href="mailto:Contact@mahatejasinnovations.com">
            <p className="link-col">Contact@mahatejasinnovations.com</p>
          </a>
          <a href="mailto:Sales@mahatejasinnovations.com">
            <p className="link-col">Sales@mahatejasinnovations.com</p>
          </a>
          <a href="mailto:Support@mahatejasinnovations.com ">
            <p className="link-col">Support@mahatejasinnovations.com </p>
          </a>
        </div>
        {/* Address */}
        <div className="md:w-1/3">
          <h5 className="text2-col">ADDRESS</h5>
          <p className="text-white">
            ABV-IIITM Pocket B campus Morena Link Road
          </p>
          <p className="text-white">Gwalior, Madhya Pradesh 474015</p>
        </div>
      </div>

      {/* social icons */}
      <div className="lg:ml-1/3 mb-8 mt-8 flex max-w-6xl pl-4 lg:mx-auto lg:mt-4 lg:pl-14">
        <i
          className={`${styles.social_icons} link-col nf nf-cod-twitter lg:ml-[30%]`}
        ></i>
        <i
          className={`${styles.social_icons} link-col nf nf-fa-facebook_square`}
        ></i>
        <i
          className={`${styles.social_icons} link-col nf nf-fa-instagram`}
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
