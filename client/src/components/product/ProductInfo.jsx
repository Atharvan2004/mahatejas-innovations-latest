import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import propTypes from "prop-types";

import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ProductImg from "@/assets/images/sampleProduct.jpg";
import ProductReviews from "@/components/product/ProductReviews";
import { getProductInfo } from "@/actions/productActions";
import { addToCart } from "@/actions/cartActions";

export default function ProductInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [pageLoading, setPageLoading] = useState(true);
  const [quantity, setQuantity] = useState(null);
  const [selectedKv, setSelectedKv] = useState(100);
  const [isAdded, setIsAdded] = useState(false);
  const {
    name,
    rating,
    kv,
    description,
    price,
    weight,
    min_quantity,
    image_url,
    reviews,
  } = useSelector((state) => state.productDetails.productInfo);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchData() {
      await dispatch(getProductInfo(id));
      setPageLoading(false);
    }
    fetchData();
  }, [dispatch, id]);

  //set kv and quantity on value found
  useEffect(() => {
    setQuantity(min_quantity);
  }, [min_quantity]);

  function handleAddToCart() {
    if (!isAuthenticated) {
      alert("Please login to add to cart");
    } else {
      dispatch(addToCart(id, quantity, selectedKv));
      setIsAdded(true);
    }
  }

  if (pageLoading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  return (
    <div className="w-screen">
      <Navbar />
      <div className="mx-auto mb-10 max-w-7xl px-5 lg:mt-28">
        <div className="w-full lg:flex">
          <img
            src={image_url && image_url.length !== 0 ? image_url : ProductImg}
            className="mx-auto mb-10 w-full max-w-xl lg:mr-5"
            alt="product"
          />
          <div className="w-full lg:w-1/2">
            {/* Name */}
            <h1>{name}</h1>
            {/* Description */}
            <p>
              {description && description.length !== 0
                ? description
                : "No description provided"}
            </p>
            <p>Weighs {weight} g</p>
            {/* rating & reviews */}
            <StarRating rating={rating || 0} />
            {/* Price */}
            <p className="mb-5 text-2xl">
              &#x20B9; <b>{price}</b>
              &nbsp;per pc
            </p>
            <Separator />
            <div className="mt-5 flex flex-col md:flex-row w-full justify-evenly">
              {/* Quantity */}
              {min_quantity && (
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={setQuantity}
                  min_quantity={min_quantity}
                />
              )}
              {/* KV  */}
              <div>
                <KVselector
                  kv={kv}
                  selectedKv={selectedKv}
                  setSelectedKv={setSelectedKv}
                />
              </div>
            </div>
            {/* Add to cart */}
            {isAdded ? (
              <Link
                className="ml-[5%] mt-10 block w-[90%] bg-black py-4 text-center text-white"
                to="/cart"
              >
                View Cart
              </Link>
            ) : (
              <button
                onClick={handleAddToCart}
                className="my-10 ml-[5%] w-[90%] bg-black py-4 text-center text-white"
              >
                Add to cart (Total: &#8377; {price * quantity})
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Reviews */}
      <ProductReviews p_rating={rating} reviewList={reviews} />
      <Footer />
    </div>
  );
}

const StarRating = ({ rating }) => {
  const given_stars = [];
  for (let i = 0; i < Math.floor(rating); i++) {
    given_stars.push(i);
  }

  const remaning_stars = [];
  for (let i = 0; i < 5 - Math.floor(rating); i++) {
    remaning_stars.push(i);
  }
  return (
    <div className="my-2 flex">
      {given_stars.map((index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="black"
          className="h-6 w-6"
        >
          <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
        </svg>
      ))}
      {remaning_stars.map((index) => (
        <svg
          key={index}
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
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
      ))}
      {rating >= 1 &&
        <a href="#reviews" className="ml-2 text-center block tracking-tight">
          {Math.floor(rating * 100) / 100}/5 rating
        </a>
      }
    </div>
  );
};
StarRating.propTypes = {
  rating: propTypes.number,
};

const KVselector = ({ kv, selectedKv, setSelectedKv }) => {
  // quantity functions
  function increaseQuantity() {
    setSelectedKv((prev) => prev + 50);
  }
  function decreaseQuantity() {
    if (selectedKv < 50) return;
    setSelectedKv((prev) => prev - 50);
  }
  function customQuantity(event) {
    setSelectedKv(parseInt(event.target.value));
  }
  function checkQuantity() {
    if (selectedKv < 0) {
      alert(`Quantity cannot be less than 0`);
      setSelectedKv(0);
    }
  }
  return (
    <div className="mt-5 md:m-0">
      <div>
        <span className="mb-2 mt-1">Select KV ( </span>
        {kv.map((i, index) => (
          <span key={index}>{i}, </span>
        ))}
        <span> or enter custom )</span>
      </div>
      <div className="flex max-w-[120px] rounded-sm border border-slate-200 hover:border-slate-700">
        <button
          className="px-3 py-2 text-lg font-extrabold text-slate-400 hover:text-slate-900"
          onClick={decreaseQuantity}
        >
          -
        </button>
        <input
          type="number"
          value={selectedKv}
          className="w-12 bg-white text-center text-black"
          onChange={customQuantity}
          onBlur={checkQuantity}
        />
        <button
          className="px-3 py-2 text-lg font-extrabold text-slate-400 hover:text-slate-900"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
};
KVselector.propTypes = {
  kv: propTypes.array,
  selectedKv: propTypes.string,
  setSelectedKv: propTypes.func,
};

const QuantitySelector = ({ quantity, setQuantity, min_quantity }) => {
  // quantity functions
  function increaseQuantity() {
    setQuantity((prev) => prev + 50);
  }
  function decreaseQuantity() {
    if (quantity === min_quantity) return;
    setQuantity((prev) => prev - 50);
  }
  function customQuantity(event) {
    setQuantity(parseInt(event.target.value));
  }
  function checkQuantity() {
    if (quantity < min_quantity) {
      alert(`Quantity cannot be less than ${min_quantity}`);
      setQuantity(min_quantity);
    }
  }
  return (
    <div>
      <span className="mb-2 mt-1">Quantity</span>
      <div className="flex w-24 rounded-sm border border-slate-200 hover:border-slate-700">
        <button
          className="px-3 py-2 text-lg font-extrabold text-slate-400 hover:text-slate-900"
          onClick={decreaseQuantity}
        >
          -
        </button>
        <input
          type="number"
          value={quantity}
          className="w-8 bg-white text-center text-black"
          onChange={customQuantity}
          onBlur={checkQuantity}
        />
        <button
          className="px-3 py-2 text-lg font-extrabold text-slate-400 hover:text-slate-900"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
};
QuantitySelector.propTypes = {
  quantity: propTypes.number,
  setQuantity: propTypes.func,
  min_quantity: propTypes.number,
};
