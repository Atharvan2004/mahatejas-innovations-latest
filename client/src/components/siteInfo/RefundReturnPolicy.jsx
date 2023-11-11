import { Link } from "react-router-dom";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function RefundReturnPolicy() {
  return (
    <div className="w-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-5">
        <h1 className="mb-10 text-4xl font-bold">Refund and Returns Policy</h1>
        <p className="mb-10 text-2xl">
          <b>Mahatejas Innovative Machinery India Pvt. Ltd. &nbsp;</b>
          manufactures components that are made of quality and built to last for
          a long time. The components are meticulously manufactured and strictly
          controlled in quality before they leave the factory. However
          exceptions may happen unexpectedly, but no worries, the products are
          covered by the return policy in case of manufacturing defects, and
          other damage such as burnouts under recommended parameters only.
        </p>
        <p className="mb-10 text-2xl">
          Motor bearings, shafts, and propeller adapters are normal wear parts
          and as such need to be maintained and changed periodically. Therefore,
          these parts are not covered under the return policy in any case, nor
          any subsequent damage caused to the other components by these wear
          parts.
        </p>
        <p className="mb-10 text-2xl">
          For maximum product life, we suggest installing motors and accessories
          properly, and it is recommended to use 68 number (Lubrication Oil) for
          smooth functioning periodically. If the phenomenon of motor vibration,
          shaking, roughness, or notches in bearings is observed after a period
          of use, it is suggested to replace motor bearings immediately. The
          pilot is responsible for ensuring that the bearings are maintained
          properly and periodically. For the best overall combination of
          performance, quality, and value, use
          <b>&nbsp;Mahatejas Innovative Machinery India Pvt Ltd&nbsp;</b>
          brushless motors in your aircraft.
        </p>
        <p className="mb-10 text-2xl">
          Return policy also covers the wrongly delivered product only on the
          condition of informing us within <b>12 hours of delivery </b>.In such
          a case, your payment will be eligible for a full refund once the
          products are received with us in their original packing. You must send
          back all the accessories that come with the product. Refund will be
          deposited into the account you made payment to us. Please allow us 3-5
          working days to check the product before the refund is released.
        </p>
        <p className="mb-10 text-2xl">
          If at any point of time, you feel like making changes to the order,
          you must contact us via email at &nbsp;
          <Link to="/contact" className="text-pink-700 underline">
            contact@mahatejasinnovations.com
          </Link>
          &nbsp; immediately within <b>12 hours of order confirmation,&nbsp;</b>
          during working hours
          <b>&nbsp;(i.e. 10:00 to 18:00 (IST))&nbsp;</b> only.
        </p>
        <p className="mb-10 text-2xl">
          <b>In any case, the Shipping fee is not refundable.</b>
        </p>
      </div>
      <Footer />
    </div>
  );
}
