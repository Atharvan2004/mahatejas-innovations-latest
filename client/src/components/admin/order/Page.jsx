import { useDispatch } from "react-redux";
import { logoutUser } from "@/actions/userActions";
import { columns } from "./Columns"
import { DataTable } from "./DataTable"
import { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom"

export default function ManageOrders() {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState(null)

  useEffect(() => {
    function alterSchema(arr) {
      return arr.map((i) => {
        return {
          ...i,
          modal: {
            ...i.modal,
            total: i.total,
            deliveryAddress: i.deliveryAddress,
            _id:i._id
          }
        };
      });
    }

    async function getOrders() {
      const { data } = await axios.get("/admin/orders/")
      setOrders(alterSchema(data.orders))
    }
    getOrders()
  }, [])

  return (
    <>
      <div className="flex w-screen bg-slate-100">
        <Link to="/admin/manage-orders" className="px-5 py-3 bg-slate-200">Manage Orders</Link>

        <Link to="/admin/manage-products" className="px-5 py-3">Manage Products</Link>
      </div>
      <div className="container mx-auto py-10">
        <div className="flex justify-between mb-10">
          <div>
            <h1>Welcome Back!</h1>
            <p>Here is the list of all the orders...</p>
          </div>
          <button onClick={() => { dispatch(logoutUser()) }} className="px-5 h-10 border-2 border-black rounded-md">
            Logout
          </button>
        </div>
        {orders && orders.length > 0 &&
          <DataTable columns={columns} data={orders} />
        }
      </div>
    </>
  )
}

