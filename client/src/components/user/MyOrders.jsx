import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import IMG404 from "@/assets/images/img404.jpg";
import propTypes from "prop-types";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    const { data } = await axios.get("/user/orders");
    setOrders(data.orders);
  }

  async function handleCancelOrder(o_id) {
    const { data } = await axios.post(`/user/order/delete/${o_id}`);
    if (data.order) alert("Item Deleted")
    fetchOrders();
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="relative -top-10 flex min-h-screen flex-col text-white lg:flex-row">
        {/* Sidebar */}
        <div className="w-full bg-slate-100 lg:w-1/4">
          <nav className="">
            <ul className="flex items-center justify-evenly lg:flex-col">
              <li className="py-2 lg:mb-4">
                <Link to="/me" className="flex items-center">
                  <svg
                    fill="#000000"
                    className="mr-2 inline"
                    width="20px"
                    height="20px"
                    viewBox="0 0 64 64"
                  >
                    <g transform="matrix(1,0,0,1,-1216,-192)">
                      <g id="Icons1">
                        <g
                          id="user"
                          transform="matrix(1.03318,0,0,1.03318,-20.8457,199.979)"
                        >
                          <g transform="matrix(0.909091,0,0,0.909091,1182.28,-18.6364)">
                            <path
                              d="M50,46.5C42.8,46.5 37,40.7 37,33.5C37,26.3 42.8,20.5 50,20.5C57.2,20.5 63,26.3 63,33.5C63,40.7 57.2,46.5 50,46.5ZM50,24.5C45,24.5 41,28.5 41,33.5C41,38.5 45,42.5 50,42.5C55,42.5 59,38.5 59,33.5C59,28.5 55,24.5 50,24.5Z"
                              style={{ fillRule: "nonzero" }}
                            />
                          </g>
                          <g transform="matrix(1,0,0,1,1177.7,-20.5)">
                            <path
                              d="M34.036,58.5L34.036,67L30.4,67L30.4,58.5C30.4,51.318 39.218,45.773 50.4,45.773C61.582,45.773 70.4,51.318 70.4,58.5L70.4,67L66.764,67L66.764,58.5C66.764,53.591 59.309,49.409 50.4,49.409C41.491,49.409 34.036,53.591 34.036,58.5Z"
                              style={{ fillRule: "nonzero" }}
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/me/orders"
                  className="flex items-center text-lg font-semibold"
                >
                  <svg
                    width="20px"
                    height="20px"
                    className="mr-2 inline"
                    viewBox="-102.4 -102.4 1228.80 1228.80"
                    fill="#000000"
                    stroke="#000000"
                    transform="rotate(0)"
                  >
                    <g>
                      <path
                        d="M300 462.4h424.8v48H300v-48zM300 673.6H560v48H300v-48z"
                        fill=""
                      ></path>
                      <path
                        d="M818.4 981.6H205.6c-12.8 0-24.8-2.4-36.8-7.2-11.2-4.8-21.6-11.2-29.6-20-8.8-8.8-15.2-18.4-20-29.6-4.8-12-7.2-24-7.2-36.8V250.4c0-12.8 2.4-24.8 7.2-36.8 4.8-11.2 11.2-21.6 20-29.6 8.8-8.8 18.4-15.2 29.6-20 12-4.8 24-7.2 36.8-7.2h92.8v47.2H205.6c-25.6 0-47.2 20.8-47.2 47.2v637.6c0 25.6 20.8 47.2 47.2 47.2h612c25.6 0 47.2-20.8 47.2-47.2V250.4c0-25.6-20.8-47.2-47.2-47.2H725.6v-47.2h92.8c12.8 0 24.8 2.4 36.8 7.2 11.2 4.8 21.6 11.2 29.6 20 8.8 8.8 15.2 18.4 20 29.6 4.8 12 7.2 24 7.2 36.8v637.6c0 12.8-2.4 24.8-7.2 36.8-4.8 11.2-11.2 21.6-20 29.6-8.8 8.8-18.4 15.2-29.6 20-12 5.6-24 8-36.8 8z"
                        fill=""
                      ></path>
                      <path
                        d="M747.2 297.6H276.8V144c0-32.8 26.4-59.2 59.2-59.2h60.8c21.6-43.2 66.4-71.2 116-71.2 49.6 0 94.4 28 116 71.2h60.8c32.8 0 59.2 26.4 59.2 59.2l-1.6 153.6z m-423.2-47.2h376.8V144c0-6.4-5.6-12-12-12H595.2l-5.6-16c-11.2-32.8-42.4-55.2-77.6-55.2-35.2 0-66.4 22.4-77.6 55.2l-5.6 16H335.2c-6.4 0-12 5.6-12 12v106.4z"
                        fill=""
                      ></path>
                    </g>
                  </svg>
                  My Orders
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Profile and Orders Section */}
        <div className="w-full p-4 lg:w-3/4">
          {orders.map((order) => {
            const date = new Date(order.orderDate);
            const istDate = date.toLocaleString("en-IN", {
              timeZone: "Asia/Kolkata",
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={order.id}
                className="mb-8 rounded-lg border border-gray-300 p-4"
              >
                <div className="mb-2 flex justify-between">
                  <p className="text-lg font-semibold">
                    Date: {istDate.replace(",", "")}
                  </p>
                  <p className="text-lg font-semibold">
                    Status: {order.status}
                  </p>
                </div>
                <div className="mb-2">
                  <ul>
                    {order.modal.items.map((item, index) => (
                      <CartItem key={index} data={item} />
                    ))}
                    <li></li>
                  </ul>
                </div>
                <div className="justify-between md:flex">
                  <div>
                    <p className="text-lg font-semibold">
                      Total: &#8377; {order.total}
                    </p>
                    <p className="text-lg font-semibold">
                      Mobile: {order.phoneNo}
                    </p>
                    <p className="text-lg font-semibold">
                      Address: {order.deliveryAddress}
                    </p>
                  </div>
                  {order.status === 'Pending' &&
                    <button onClick={() => handleCancelOrder(order._id)} className="mt-5 border-2 border-black px-6 py-2 hover:bg-black hover:text-white md:m-0 md:h-12">
                      Cancel Order
                    </button>
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const CartItem = ({ data }) => {
  return (
    <div className="items-center py-3 md:flex md:justify-between">
      <div className="flex w-full items-center justify-between md:w-[60%]">
        <img
          src={data && data.image[0] ? data.image[0] : IMG404}
          alt="product"
          className="mx-auto aspect-square h-28 object-cover"
        />
        <div className="w-2/3 md:w-full">
          <p className="text font-semibold">{data && data.name}</p>
          <div className="flex w-full justify-between pr-5 md:justify-start">
            <p className="mr-5 text-slate-700 text-sm">
              <b>Quantity</b>:&nbsp;{data && data.quantity && data.quantity}
            </p>
            <p className="mr-5 text-slate-700 text-sm">
              <b>KV:</b>&nbsp;{data && data.selectedKv}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="my-2 mr-5 text-right text-xl">
          &#8377; {data && data.price && data.price}
        </p>
      </div>
    </div>
  );
};
CartItem.propTypes = {
  data: propTypes.object.isRequired,
};

export default MyOrders;
