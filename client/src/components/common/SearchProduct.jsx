import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { useState } from "react";
import IMG404 from "@/assets/images/img404.jpg";

export default function SearchProduct() {
  const [showSearch, setShowSearch] = useState(false);
  const [showSearchResult, setShowSearchResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  async function handleSearch() {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        "/api/search",
        JSON.stringify({
          query: query,
        }),
        config,
      );
      setLoading(false);
      // Handle successful response here
      const data = response.data;

      if (data === "No products found") {
        alert("No products found");
        setQuery("");
      } else {
        setSearchResult(data);
        setShowSearch(false);
        setShowSearchResult(true);
      }
    } catch (error) {
      // Handle errors here
      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response error:", error.response.data);
        console.error("Status code:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Request setup error:", error.message);
      }
    }
  }

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
            onChange={(e) => {
              setQuery(e.target.value);
            }}
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
          {loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 link-col animate-spin relative top-1 -left-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          ) : (
            <button
              onClick={() => {
                setLoading(true);
                handleSearch();
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
          )}
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
            {searchResult.length === 0 ? (
              <div>
                <p>No products for this category...</p>
              </div>
            ) : (
              searchResult[0].map((product) => {
                const { _id, name, price, image_url } = product;
                return (
                  <ListItem
                    key={_id}
                    title={name}
                    price={price}
                    linkID={_id}
                    img={image_url}
                  setShowSearchResult={setShowSearchResult}
                  />
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
}
const ListItem = ({ title, price, linkID, img,setShowSearchResult }) => {
  const TITLE_MAX_LENGTH = 45;
  if (title && title.length > TITLE_MAX_LENGTH) {
    title = title.substring(0, TITLE_MAX_LENGTH) + "...";
  }
  return (
    <div className="flex flex-col justify-between bg-white shadow-md hover:scale-105 hover:shadow-xl">
      <img
        src={img && img.length > 0 ? img[0] : IMG404}
        className="mx-auto mb-2 aspect-square h-52 object-cover md:h-auto md:w-[90%] md:p-5"
      />
      <p className="mb-2 px-3 text-center text-xl">{title && title}</p>
      <p className="mb-7 px-5 text-center text-xl uppercase">
        &#x20B9; {price}
      </p>
      <Link
        to={`/product/${linkID}`}
        onClick={() => {
          setShowSearchResult(false);
        }}
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
