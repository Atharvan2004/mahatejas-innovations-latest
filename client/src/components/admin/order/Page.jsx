import { useDispatch } from "react-redux";
import { logoutUser } from "@/actions/userActions";
import { columns } from "./Columns";
import { DataTable } from "./DataTable";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export default function ManageOrders() {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    function alterSchema(arr) {
      return arr.map((i) => {
        return {
          ...i,
          modal: {
            ...i.modal,
            total: i.total,
            deliveryAddress: i.deliveryAddress,
            _id: i._id,
          },
        };
      });
    }

    async function getOrders() {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/admin/orders/`,
      );
      console.log(`${import.meta.env.VITE_API_ENDPOINT}/admin/orders/`+data)
      setOrders(alterSchema(data.orders));
    }
    getOrders();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center w-screen bg-slate-100">
        <div className="flex">
          <Link to="/admin/manage-orders" className="px-5 py-3 bg-slate-200">
            Manage Orders
          </Link>
          <Link to="/admin/manage-products" className="px-5 py-3">
            Manage Products
          </Link>
          <Link to="/admin/manage-home" className="px-5 py-3">
            Manage Home
          </Link>
        </div>
      <Link
        to="/"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "mr-5"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      </Link>
      </div>
      <div className="container mx-auto py-10">
        <div className="flex justify-between mb-10">
          <div>
            <h1>Welcome Back!</h1>
            <p>Here is the list of all the orders...</p>
          </div>
          <button
            onClick={() => {
              dispatch(logoutUser());
            }}
            className="px-5 h-10 border-2 border-black rounded-md"
          >
            Logout
          </button>
        </div>
        {orders && orders.length > 0 && (
          <DataTable columns={columns} data={orders} />
        )}
      </div>
    </>
  );
}
