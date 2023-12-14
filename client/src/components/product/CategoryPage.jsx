import propTypes from "prop-types";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import IMG404 from "@/assets/images/img404.jpg";
import { getProducts } from "@/actions/productActions";

const types = {
  Multimotor: ["Lite Series", "Medium Series", "Heavy Series"],
  Airplane: ["Lite Series", "Medium Series", "Heavy Series"],
  Esc: ["Lite Series", "Medium Series", "Heavy Series"],
  Fpv: ["Lite Series", "Medium Series", "Heavy Series"],
  Propeller: ["Lite Series", "Medium Series", "Heavy Series"],
};

export default function CategoryPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { catname, type } = useParams();

  const { loading, products, error } = useSelector((state) => state.product);

  const [currentType, setCurrentType] = useState(
    types[catname] ? types[catname][type] : "",
  );

  useEffect(() => {
    dispatch(getProducts({ product: catname, type: currentType }));
  }, [type, catname, currentType, dispatch]);

  useEffect(() => {
    if (types[catname] === undefined || types[catname].length < type) {
      navigate("/404");
    }
  }, [catname, type, navigate]);

  function formatTitle(str) {
    switch (str) {
      case "Multimotor":
        return "Multi Motor";
      case "Airplane":
        return "Airplane";
      case "Esc":
        return "ESC";
      case "Fpv":
        return "FPV";
      case "Propeller":
        return "Propeller";
      default:
        return "Unknown";
    }
  }
  return (
    <div className="w-screen ">
      <Navbar />
      <h1 className="mb-10 text-center text-4xl">{formatTitle(catname)}</h1>
      <div className="mx-auto mb-5 flex max-w-6xl justify-evenly">
        {types[catname] &&
          types[catname].map((type, index) => {
            let variant = "outline";
            if (type === currentType) variant = "";
            return (
              <Button
                key={index}
                variant={variant}
                className="scale-90 md:scale-100"
                onClick={() => {
                  setCurrentType(type);
                }}
              >
                {type}
              </Button>
            );
          })}
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid grid-cols-1 gap-x-8 gap-y-5 px-10 md:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }, (index) => (
              <LoadingSkeleton key={index} />
            ))
            : !products
              ? <div><p>No products for this category...</p></div>
              : products.map((product) => {
                const { _id, name, price, image_url } = product;
                return (
                  <ListItem
                    key={_id}
                    title={name}
                    price={price}
                    linkID={_id}
                    img={image_url}
                  />
                );
              })
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col justify-between bg-white">
      {/* Image */}
      <Skeleton className="mx-auto mb-2 aspect-square h-52 md:m-5 md:h-auto md:w-full" />
      {/* Title */}
      <Skeleton className="mx-auto mb-2 h-8 w-4/5" />
      {/* Price */}
      <Skeleton className="mx-auto mb-7 h-8 w-2/5" />
      <div className="mb-5 flex justify-evenly">
        {/* Discover Button */}
        <Skeleton className="h-12 w-2/5" />
        <Skeleton className="h-12 w-2/5" />
      </div>
    </div>
  );
};

const ListItem = ({ title, price, linkID, img }) => {
  const TITLE_MAX_LENGTH = 45;
  if (title.length > TITLE_MAX_LENGTH) {
    title = title.substring(0, TITLE_MAX_LENGTH) + "...";
  }
  return (
    <div className="flex flex-col justify-between bg-white shadow-md hover:scale-105 hover:shadow-xl">
      <img
        src={img&&img.length > 0 ? img[0] : IMG404}
        className="mx-auto mb-2 aspect-square h-52 object-cover md:h-auto md:w-[90%] md:p-5"
      />
      <p className="mb-2 px-3 text-center text-xl">{title}</p>
      <p className="mb-7 px-5 text-center text-xl uppercase">
        &#x20B9; {price}
      </p>
      <Link
        to={`/product/${linkID}`}
        className="mx-5 mb-5 border-2 border-black px-5 py-2 text-center font-bold hover:bg-black hover:text-white"
      >
        Discover
      </Link>
    </div>
  );
};
ListItem.propTypes = {
  title: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
  img: propTypes.array.isRequired,
  linkID: propTypes.string.isRequired,
};
