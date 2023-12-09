import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { useState } from "react";
import IMG404 from "@/assets/images/img404.jpg";

export default function SearchProduct() {
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(true);
  return (
    <>
      <div className="ml-4 flow-root lg:ml-6">
        <button
          onClick={() => {
            setShowSearch(true);
          }}
          className="group -m-2 link-col flex items-center p-2"
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
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </div>
      {showSearch && (
        <div className="fixed flex justify-center items-center top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.9)] backdrop-blur-sm z-50">
          <Textarea
            rows={1}
            maxRows={1}
            className="max-w-[250px] md:max-w-sm pr-12 rounded-none border-col text-white text-xl pt-5 md:text-2xl"
            placeholder="Type product name"
            style={{
              "border-top-width": 0,
              "border-right-width": 0,
              "border-left-width": 0,
              "border-bottom-style": "solid",
              "border-bottom-width": "2px",
              resize: "none",
            }}
          />

          {/* Seach button */}
          <button
            onClick={() => {
              setShowSearch(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 link-col relative top-1 -left-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
          {/* Close button */}
          <button
            onClick={() => {
              setShowSearch(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 link-col fixed top-0 right-0 m-4 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
      {showSearchResult && (
        <div className="fixed top-0 left-0 h-screen w-screen bg-[rgba(0,0,0,0.9)] backdrop-blur-sm z-50">
          <p className="text-white text2-col text-2xl pt-8 p-10">
            Search Results for ABCDFAF
          </p>
          {/* Close button */}
          <button
            onClick={() => {
              setShowSearchResult(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 link-col fixed top-2 right-2 m-4 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
            {/*  Result grid */}
            <div className="mb-10 grid grid-cols-1 gap-x-8 gap-y-5 overflow-y-scroll max-h-[80vh] px-10 md:grid-cols-3 lg:grid-cols-4">
              <ListItem
                title={"djfklad"}
                price={343}
                linkID={"jdklsfjkld"}
                img={""}
              />
              <ListItem
                title={"djfklad"}
                price={343}
                linkID={"jdklsfjkld"}
                img={""}
              />
              <ListItem
                title={"djfklad"}
                price={343}
                linkID={"jdklsfjkld"}
                img={""}
              />
              <ListItem
                title={"djfklad"}
                price={343}
                linkID={"jdklsfjkld"}
                img={""}
              />
              <ListItem
                title={"djfklad"}
                price={343}
                linkID={"jdklsfjkld"}
                img={""}
              />
              <ListItem
                title={"djfklad"}
                price={343}
                linkID={"jdklsfjkld"}
                img={""}
              />
            </div>
        </div>
      )}
    </>
  );
}
const ListItem = ({ title, price, linkID, img }) => {
  const TITLE_MAX_LENGTH = 45;
  if (title.length > TITLE_MAX_LENGTH) {
    title = title.substring(0, TITLE_MAX_LENGTH) + "...";
  }
  return (
    <div className="flex flex-col justify-between bg-white shadow-md hover:scale-105 hover:shadow-xl">
      <img
        src={img.length > 0 ? img[0] : IMG404}
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
