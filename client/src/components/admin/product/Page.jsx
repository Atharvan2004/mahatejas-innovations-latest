import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/actions/userActions";
import { useState, useEffect } from "react";
import propTypes from "prop-types";
import axios from "axios";

import NewItem from "@/components/admin/product/NewItem";
import EditItem from "@/components/admin/product/EditItem";
import AddKv from "./AddKv";
import IMG404 from "@/assets/images/img404.jpg";

export default function ManageProduct() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("/admin/products");
      setProducts(data.productArray);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="flex w-screen bg-slate-100">
        <Link to="/admin/manage-orders" className="px-5 py-3">
          Manage Orders
        </Link>
        <Link to="/admin/manage-products" className="bg-slate-200 px-5 py-3">
          Manage Products
        </Link>
      </div>
      <div className="container mx-auto py-10">
        <div className="mb-10 flex justify-between">
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

        <div className="mx-auto max-w-7xl">
          <div className="mb-10 grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-3 lg:grid-cols-4">
            <NewItem />
            {/* {products.length > 0 && */}
            {products.map((arr) =>
              arr.map((i) => (
                <ListItem
                  key={i._id}
                  title={i.name}
                  price={i.price}
                  linkID={i._id}
                  img={i.image_url}
                  description={i.description}
                  kv={i.kv.join(",")}
                  weight={i.weight}
                  category={i.category}
                  min_quantity={i.min_quantity}
                  isDeleted={(value) => {
                    if (value) {
                      setProducts(
                        products.filter((item) => item._id !== i._id),
                      );
                    }
                  }}
                />
              )),
            )}
          </div>
        </div>
      </div>
    </>
  );
}
const ListItem = ({
  title,
  price,
  linkID,
  img,
  description,
  kv,
  weight,
  category,
  min_quantity,
  isDeleted,
}) => {
  const [holding, setHolding] = useState(false);

  let holdTimer;

  const startHoldTimer = () => {
    holdTimer = setTimeout(() => {
      // Execute action after 2 seconds of holding
      setHolding(false); // Reset holding state after action execution
      axios.post(`/admin/product/delete/${linkID}`).then((res) => {
        alert(res.data.message);
        isDeleted(true);
      });
    }, 2000);
  };

  const handleMouseDown = () => {
    setHolding(true);
    startHoldTimer();
  };

  const handleMouseUp = () => {
    clearTimeout(holdTimer); // Clear the timer if mouse is released before 2 seconds
    setHolding(false);
  };

  const TITLE_MAX_LENGTH = 45;
  if (title.length > TITLE_MAX_LENGTH) {
    title = title.substring(0, TITLE_MAX_LENGTH) + "...";
  }
  return (
    <div className="flex relative flex-col justify-between bg-white shadow-md hover:scale-105 hover:shadow-xl">
      <div className="absolute top-0 right-0">
        {kv && <AddKv p_id={linkID} kv={kv.split(",")} />});
      </div>
      <img
        src={img && img[0] ? img[0] : IMG404}
        className="mx-auto mb-2 aspect-square h-52 object-cover md:h-auto md:w-[90%] md:p-5"
      />
      <Link
        to={`/product/${linkID}`}
        className="mb-2 px-3 text-center text-xl underline hover:text-pink-800"
      >
        {title}
      </Link>
      <p className="mb-7 px-5 text-center text-xl uppercase">
        &#x20B9; {price}
      </p>
      <div className="mx-5 mb-5 flex justify-evenly">
        <EditItem
          pi={linkID}
          sc={""}
          st={category}
          na={title}
          pr={price}
          de={description}
          k={kv}
          we={weight}
          mq={min_quantity}
        />
        <button
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`rounded-md w-12 bg-black text-white focus:outline-none ${
            holding ? "animate-pulse" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mx-auto h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
ListItem.propTypes = {
  category: propTypes.string.isRequired,
  description: propTypes.string.isRequired,
  img: propTypes.array.isRequired,
  isDeleted: propTypes.func.isRequired,
  kv: propTypes.string.isRequired,
  linkID: propTypes.string.isRequired,
  min_quantity: propTypes.number.isRequired,
  price: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  weight: propTypes.number.isRequired,
};
