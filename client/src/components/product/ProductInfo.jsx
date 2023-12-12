import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import propTypes from "prop-types";

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import ProductReviews from "@/components/product/ProductReviews";
import { getProductInfo } from "@/actions/productActions";
import { addToCart } from "@/actions/cartActions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IMG404 from "@/assets/images/img404.jpg";

export default function ProductInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    _id,
    name,
    description,
    price,
    kv,
    weight,
    category,
    min_quantity,
    image_url,
    reviews,
    rating,
    kvImg,
  } = useSelector((state) => state.productDetails.productInfo);
  const { productInfo } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(getProductInfo(id));
  }, [id, dispatch]);

  return (
    <div className="bg-slate-100">
      <Navbar />
      <div className="max-w-7xl mx-auto px-5">
        <Header name={name} reviewCount={reviews.length} rating={rating} />
        <div className="grid grid-cols-1 mb-10 md:grid-cols-2">
          <ImageDisplay arr={image_url} />
          <Details
            _id={_id}
            kv={kv}
            min_quantity={min_quantity}
            price={price}
            description={description}
          />
        </div>
      </div>
      {kvImg && <InfoTabs kvImg={kvImg} />}
      <ProductReviews p_rating={rating} reviewList={reviews} />
      <Footer />
    </div>
  );
}

function InfoTabs({ kvImg }) {
  // const kv = [
  //   {
  //     val: 500,
  //     img: [
  //       "https://i.imgur.com/1u6NY7ls.jpg",
  //       "https://i.imgur.com/tJcPgxLs.jpg",
  //     ],
  //   },
  //   { val: 200, img: ["https://i.imgur.com/tJcPgxLs.jpg"] },
  // ];
  return (
    <div className="max-w-7xl mb-5 py-5 mx-auto bg-white px-5">
      <Tabs defaultValue={`KV${kvImg[0]&&kvImg[0].val}`} className="text-black">
        <TabsList className="rounded-none w-full justify-start">
          {kvImg.map((item, index) => (
            <TabsTrigger
              key={index}
              value={`KV${item.val}`}
              className="rounded-none text-xl"
            >{`KV${item.val}`}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent className="h-52 w-full" value="overview">
          {/* <img
            src="https://cdn.shopify.com/s/files/1/2024/0305/files/V3506__01.jpg?v=1496803009"
            className="w-full"
          /> */}
        </TabsContent>
        {kvImg.map((item, index) => (
          <TabsContent key={index} value={`KV${item.val}`}>
            {item.img.map((i, index) => (
              <img src={i} key={index} className="w-full mb-2" />
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
InfoTabs.propTypes = {
  kv: propTypes.array,
};

function Details({ _id, kv, min_quantity, price, description }) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(min_quantity);
  const [selectedKv, setSelectedKv] = useState(kv[0]);
  const [isAdded, setIsAdded] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    setQuantity(min_quantity);
    setSelectedKv(kv[0]);
  }, [kv, min_quantity]);

  function handleAddToCart() {
    if (!isAuthenticated) {
      alert("Please login to add to cart");
    } else {
      dispatch(addToCart(_id, quantity, selectedKv));
      setIsAdded(true);
    }
  }

  return (
    <div className="px-0 bg-white md:ml-3 md:px-5">
      <p className="text-2xl border-b border-black pb-2 my-2">
        Product Details
      </p>
      {/* Price */}
      <p className="mb-5 text-2xl">
        &#x20B9; <b>{price}</b>
        &nbsp;per pc
      </p>
      <div className="flex justify-evenly m-2">
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
          {kv&&kv[0] && (
            <KVselector selectedKv={selectedKv} setSelectedKv={setSelectedKv} />
          )}
        </div>
      </div>
      <div className="flex justify-evenly">
        <p></p>
        <p>
          <span>( </span>
          {kv&&kv[0] && kv.map((i, index) => <span key={index}>{i}, </span>)}
          <span> or enter custom ) *</span>
        </p>
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
          className="my-5 ml-[5%] w-[90%] bg-black py-4 text-center text-white"
        >
          Add to cart (Total: &#8377; {price * quantity})
        </button>
      )}
      <p className="text-lg">Description -</p>
      <p>
        {description && description.length !== 0
          ? description
          : "No description provided"}
      </p>
    </div>
  );
}
Details.propTypes = {
  _id: propTypes.string,
  price: propTypes.number,
  kv: propTypes.array,
  description: propTypes.string,
  min_quantity: propTypes.number,
};

const KVselector = ({ selectedKv, setSelectedKv }) => {
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
    <div>
      <div>
        <span className="mb-2 mt-1">Select KV</span>
      </div>
      <div className="flex max-w-[120px] rounded-sm border border-slate-200 hover:border-slate-700">
        <button
          className="px-3 bg-white py-2 text-lg font-extrabold text-slate-400 hover:text-slate-900"
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
          className="px-3 py-2 bg-white text-lg font-extrabold text-slate-400 hover:text-slate-900"
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
          className="px-3 py-2 text-lg font-extrabold text-slate-400 bg-white hover:text-slate-900"
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
          className="px-3 py-2 text-lg font-extrabold text-slate-400 bg-white hover:text-slate-900"
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

function ImageDisplay({ arr }) {
  //const arr=["https://i.imgur.com/1u6NY7l.jpg","https://i.imgur.com/tJcPgxL.jpg","https://i.imgur.com/sWeXAOP.jpg","https://i.imgur.com/vqFUZbs.jpg","https://i.imgur.com/CnVpUnK.png"]
  const imageRef = useRef(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [imgIndex, setImgIndex] = useState(0);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setHoverPosition({ x, y });
  };

  const resetHoverPosition = () => {
    setHoverPosition({ x: 0, y: 0 });
  };

  return (
    <div className="bg-white md:mr-3">
      <div
        className="overflow-hidden relative group mx-5"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetHoverPosition}
      >
        <img
          src={arr.length==0?IMG404:arr[imgIndex]}
          alt="Product"
          className="transition-transform duration-300 transform aspect-square w-full object-cover group-hover:scale-150"
          style={{
            transformOrigin: `${hoverPosition.x}% ${hoverPosition.y}%`,
          }}
          ref={imageRef}
        />
      </div>
      <div className="grid grid-cols-5 gap-x-2 md:gap-x-5 gap-y-2 p-5">
        {arr.map((img, index) => (
          <button key={index} onClick={() => setImgIndex(index)}>
            <img
              src={img}
              className="w-full aspect-square object-cover p-1 border border-slate-500"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
ImageDisplay.propTypes = {
  arr: propTypes.array,
};

function Header({ name, reviewCount, rating }) {
  return (
    <div className="md:grid grid-cols-2 gap-x-5 mb-7">
      <p className="text-3xl">{name}</p>
      <div className="flex flex-col md:items-end">
        <StarRating rating={rating} reviewCount={reviewCount} />
      </div>
    </div>
  );
}
Header.propTypes = {
  name: propTypes.string,
  reviewCount: propTypes.number,
  rating: propTypes.number,
};

const StarRating = ({ rating, reviewCount }) => {
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
      <div className="flex">
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
      </div>
      <a
        href="#reviews"
        className="ml-2 underline text-center block tracking-tight"
      >
        {reviewCount} review{reviewCount > 1 ? "s" : ""}
      </a>
    </div>
  );
};
StarRating.propTypes = {
  rating: propTypes.number,
  reviewCount: propTypes.number,
};
