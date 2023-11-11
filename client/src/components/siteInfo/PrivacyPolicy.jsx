import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function OemOdm() {
  return (
    <div className="w-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-5">
        <h1 className="mb-10 text-4xl font-bold">Privacy Policy</h1>
        <p className="my-5 text-2xl">
          <b>What do we do with your information?</b>
        </p>
        <p className="text-xl">
          When you order something from Mahatejas Innovations, we collect your
          name, address, and email address.We automatically receive your
          computer’s Internet Protocol(IP) address to provide us with
          information that helps us learn about your browser and operating
          system.We may use your email to notify you about your purchase and
          order status.
        </p>
        <p className="my-5 text-2xl">
          <b>How do you get my consent?</b>
        </p>
        <p className="text-xl">
          When you proceed for payment, it is implied that you consent to share
          your information with us.
        </p>
        <p className="my-5 text-2xl">
          <b>Is my information safe?</b>
        </p>
        <p className="text-xl">
          Your Information is safe with Mahatejas Innovations but we may
          disclose your personal information if we are required by law to do so
          or if you violate our Terms of Service.
        </p>
        <p className="my-5 text-2xl">
          <b>Are my Banking Details in safe hands?</b>
        </p>
        <p className="text-xl">
          Your Banking Details are required and used only at the time of
          Purchase and payment confirmation and hence are in safe hands.
        </p>
        <Alert className="my-5 flex items-center">
          <div>
            <AlertTitle className="text-bold font-sans text-2xl font-bold">
              Note !
            </AlertTitle>
            <AlertDescription className="text-xl">
              Mahatejas Innovations never asks for CVV. Please beware of fraud,
              Mahatejas Innovations cannot be held responsible for any
              fraudulent call.
            </AlertDescription>
          </div>
        </Alert>
        <p className="my-5 text-2xl">
          <b>CHANGES TO THIS PRIVACY POLICY</b>
        </p>
        <p className="mb-10 text-xl">
          We reserve the right to modify this privacy policy at any time, so
          please review it frequently. Changes and clarifications will take
          effect immediately upon their posting on the website. If we make
          material changes to this policy, we will notify you here that it has
          been updated, so that you are aware of what information we collect,
          how we use it, and under what circumstances, if any, we use and/or
          disclose it.
        </p>
      </div>
      <Footer />
    </div>
  );
}
