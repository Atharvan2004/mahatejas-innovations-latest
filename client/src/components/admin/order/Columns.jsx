import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import propTypes from "prop-types";

function handleAcceptOrder(o_id) {
  async function acceptOrder() {
    const { data } = await axios.put(`http://localhost:3000/admin/orders/${o_id}/Accepted-By-Admin`);
    if (data.order) {
      alert("Item Accepted")
      return true;
    }
    return false
  }
  acceptOrder();
}
function handleCancelOrder(o_id) {
  async function cancelOrder() {
    const { data } = await axios.put(`http://localhost:3000/admin/orders/${o_id}/Cancelled-By-Admin`);
    if (data.order) {
      alert("Item Cancelled")
      return true;
    }
    return false
  }
  cancelOrder();
}

export const columns = [
  { accessorKey: "userName", header: "Client Name" },
  { accessorKey: "phoneNo", header: "Phone No." },
  { accessorKey: "userEmail", header: "Email" },
  {
    accessorKey: "orderDate",
    header: "Order Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("orderDate"));
      const istDate = date.toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      return <>{istDate.replace(",", "")}</>;
    },
  },
  { accessorKey: "status", header: "Status" },
  {
    accessorKey: "modal",
    header: "",
    cell: ({ row }) => <InfoModal row={row} />,
  },
];

function InfoModal({ row }) {
  const [isAccepted, setIsAccepted] = useState(false)

  return (
    <Dialog>
      <DialogTrigger>
        <OpenSVG />
      </DialogTrigger>
      <DialogContent>
        <h2>{row.getValue("status")}</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Order details</AccordionTrigger>
            <AccordionContent>
              <p className="item-center flex">
                <UserSVG />
                {row.getValue("userName")}
              </p>
              <p className="item-center flex">
                <PhoneSVG />
                {row.getValue("phoneNo")}
              </p>
              <p className="item-center flex">
                <EmailSVG />
                {row.getValue("userEmail")}
              </p>
              <p className="item-center flex">
                <DateSVG />
                {Date(row.getValue("orderDate")).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                }).replace(",", "")
                }
              </p>
              <p className="item-center flex">
                <RupeeSVG /> {row.getValue("modal").total}
              </p>
              <p className="item-center flex">
                <LocationSVG />
                {row.getValue("modal").deliveryAddress}
              </p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Items Ordered</AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-between bg-slate-100 px-1 font-bold">
                <span>Product Name</span>
                <span>
                  <span className="inline-block w-12 text-center">KV</span>
                  <span className="inline-block w-16 text-center">
                    Quantity
                  </span>
                </span>
              </div>
              {row.getValue("modal").items.map((i, index) => (
                <div key={index} className="flex justify-between px-1">
                  <Link to={`/product/${i.id}`}>{i.name}</Link>
                  <span>
                    <span className="inline-block w-12 text-center">
                      {i.selectedKv}
                    </span>
                    <span className="inline-block w-16 text-center">
                      {i.quantity}
                    </span>
                  </span>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        {row.getValue('status') === "Pending" &&
          <button onClick={() => { handleAcceptOrder(row.getValue("modal")._id) }} className="mt-5 border-2 border-black px-5 py-2">
            Accept Order
          </button>
        }
        {(row.getValue('status') === "Pending" || row.getValue('status') === "Accepted-By-Admin") &&
          <button onClick={() => handleCancelOrder(row.getValue("modal")._id)} className="mt-1 border-2 border-black bg-black px-5 py-2 text-white">
            Cancel Order
          </button>
        }
      </DialogContent>
    </Dialog >
  )
}

InfoModal.propTypes = {
  row: propTypes.any,
};
function OpenSVG() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6 p-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
        />
      </svg>
    </>
  );
}

function UserSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mr-1 h-5 w-5"
    >
      <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
    </svg>
  );
}
function PhoneSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mr-1 h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function EmailSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mr-1 h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M5.404 14.596A6.5 6.5 0 1116.5 10a1.25 1.25 0 01-2.5 0 4 4 0 10-.571 2.06A2.75 2.75 0 0018 10a8 8 0 10-2.343 5.657.75.75 0 00-1.06-1.06 6.5 6.5 0 01-9.193 0zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function DateSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mr-1 h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function RupeeSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mr-1 h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM6 5.75A.75.75 0 016.75 5h6.5a.75.75 0 010 1.5h-2.127c.4.5.683 1.096.807 1.75h1.32a.75.75 0 010 1.5h-1.32a4.003 4.003 0 01-3.404 3.216l1.754 1.754a.75.75 0 01-1.06 1.06l-3-3a.75.75 0 01.53-1.28H8c1.12 0 2.067-.736 2.386-1.75H6.75a.75.75 0 010-1.5h3.636A2.501 2.501 0 008 6.5H6.75A.75.75 0 016 5.75z"
        clipRule="evenodd"
      />
    </svg>
  );
}
function LocationSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="mr-1 h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
