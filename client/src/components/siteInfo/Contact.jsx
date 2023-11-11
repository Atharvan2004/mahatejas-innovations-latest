import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ContactForm from "@/components/form/Contact";

export default function Contact() {
  return (
    <div className="w-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl lg:flex">
        <div className="flex flex-col items-center  justify-center px-5 lg:h-screen lg:w-1/2">
          <h1 className="py-10 font-extrabold lg:text-5xl">
            Connect with us.
            <br />
            Tell us about your query.
          </h1>
          {/* CALL */}
          <div className="mb-4 flex w-4/5 ">
            <div className="mr-2 scale-90 rounded-lg bg-slate-200 px-3 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>
            </div>
            <div>
              <p className="text-xl font-bold">Call me at</p>
              <a href="tel:+919109552446" className="text-lg underline">
                +919109552446
              </a>
            </div>
          </div>
          {/* MAIL */}
          <div className="mb-10 flex w-4/5">
            <div className="mr-2 scale-90 rounded-lg bg-slate-200 px-3 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <div>
              <p className="text-xl font-bold">Mail me at</p>
              <a
                href="mailto:contact@mahatejasinnovations.com"
                className="text-lg underline"
              >
                contact@mahatejasinnovations.com
              </a>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
}
