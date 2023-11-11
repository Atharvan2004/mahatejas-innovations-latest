import NewReview from "@/components/product/NewReview";
import propTypes from "prop-types";
import { useRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
function formatDate(date) {
  const originalDate = new Date(date);
  const year = originalDate.getUTCFullYear();
  const month = String(originalDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(originalDate.getUTCDate()).padStart(2, '0');

  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
}
const testReviewList = [
  { name: "test1", date: "00-00-0000", comment: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.", rating: 3 },
  { name: "test2", date: "00-00-0000", comment: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.", rating: 2 },
  { name: "test3", date: "00-00-0000", comment: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.", rating: 3 },
  { name: "test4", date: "00-00-0000", comment: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.", rating: 3 },
  { name: "test5", date: "00-00-0000", comment: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.", rating: 2 },
  { name: "test6", date: "00-00-0000", comment: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.", rating: 3 },
  { name: "test7", date: "00-00-0000", comment: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.", rating: 3 },
  { name: "test8", date: "00-00-0000", comment: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.", rating: 2 },
  { name: "test9", date: "00-00-0000", comment: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.", rating: 3 },
]

export default function ProductReviews({ p_rating = 3.21222, reviewList = testReviewList }) {
  const carouselRef = useRef(null);

  if (reviewList && reviewList.length === 0)
    return <NoReviews />;

  const scrollLeft = () => {
    let scrollBy=0;
    if(window.innerWidth>1085)scrollBy=510;
    else if(window.innerWidth>1024)scrollBy=window.innerWidth/3+100;
    else scrollBy=window.innerWidth*0.87;
    
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -1*scrollBy, // Adjust the scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    let scrollBy=0;
    if(window.innerWidth>1085)scrollBy=510;
    else if(window.innerWidth>1024)scrollBy=window.innerWidth/3+67;
    else scrollBy=window.innerWidth*0.87;
    
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: scrollBy, // Adjust the scroll distance as needed
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative mx-auto mb-10 w-full max-w-7xl px-5">
      {/* Left Scroll Button */}
      <button
        className="absolute left-5 top-80 flex scale-75 md:scale-100 opacity-80 h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-gray-200 text-gray-600 transition duration-300 hover:scale-105 hover:bg-gray-300 hover:text-gray-800 focus:outline-none"
        onClick={scrollLeft}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 12H6M12 5l-7 7 7 7"
          ></path>
        </svg>
      </button>
      <h1>Product Review</h1>
      <div>
        <StarRating rating={p_rating} />
        {/* if multiple reviews add 's'*/}
        <p className="mr-2">{reviewList && reviewList.length} Review{reviewList && reviewList.length > 1 && "s"}</p>
      </div>
      {/* Carousel container */}
      <div
        className="flex w-full overflow-x-hidden py-5"
        ref={carouselRef}
      >
        <div className="flex w-[90%] lg:w-[40%]">
          {reviewList &&
            reviewList.map((review, index) => (
              <Card
                key={index}
                author={review.name}
                review_msg={review.comment}
                order_date={formatDate(review.date)}
                stars={review.rating}
              />
            ))}
        </div>
      </div>
      {/* Right Scroll Button */}
      <button
        className="absolute right-5 scale-75 md:scale-100 opacity-90 top-80 flex h-10 w-10 -translate-y-1/2 transform items-center justify-center rounded-full bg-gray-200 text-gray-600 transition duration-300 hover:scale-105 hover:bg-gray-300 hover:text-gray-800 focus:outline-none"
        onClick={scrollRight}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 12h13M12 5l7 7-7 7"
          ></path>
        </svg>
      </button>
      <NewReview />
    </div >
  );
}

ProductReviews.propTypes = {
  reviewList: propTypes.array,
  p_rating: propTypes.number,
};

const Card = ({ author, order_date, review_msg, stars }) => {
  const MAX_MSG_LENGTH = 400;

  return (
    <div className={classNames(stars >= 0 ? "h-96" : "h-40", "mr-4 w-full overflow-y-scroll flex-none px-9 pt-10 border rounded-lg border-slate-400")}>
      <div className="flex flex-col items-center mb-5 justify-between">
        {/* Rating */}
        {stars >= 0 &&
          < StarRating rating={stars} />
        }
        {/* Order Date */}
        <p>{order_date}</p>
      </div>
      {/* Review Message*/}
      <p>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 inline mr-2 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>

        {review_msg.substr(0, MAX_MSG_LENGTH)}</p>
      {/* Author Name */}
      <p className="text-right mt-5">- By {author}</p>
    </div>
  );
};

Card.propTypes = {
  author: propTypes.string,
  order_date: propTypes.string,
  review_msg: propTypes.string,
  stars: propTypes.number,
};

const NoReviews = () => (
  <div className="relative mx-auto mb-10 w-full max-w-7xl px-5">
    <h1>Product Review</h1>
    <div className="max-w-xl my-5">
      <Card
        author="Your Name"
        review_title="No reviews Yet"
        review_msg="Be the first one to review this product"
        stars={-1}
      />
    </div>
    <NewReview />
  </div>
);
NoReviews.propTypes = {
  productName: propTypes.string,
};

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
      <a href="#reviews" className="ml-2 text-center block tracking-tight">
        {Math.floor(rating * 100) / 100}/5 rating
      </a>
    </div>
  );
};
StarRating.propTypes = {
  rating: propTypes.number,
};
