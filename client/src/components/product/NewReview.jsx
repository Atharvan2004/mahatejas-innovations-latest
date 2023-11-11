import { useState, useEffect } from "react";
import axios from "axios";
import propTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { getProductInfo } from "@/actions/productActions";

import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";


export default function NewReview() {
  const dispatch = useDispatch()

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { isAuthenticated } = useSelector((state) => state.user);
  const _id = useSelector((state) => state.productDetails.productInfo._id);

  const handleCommentLen = (event) => {
    setComment(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    async function sendData() {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.put(
        `/api/review/${_id}`,
        JSON.stringify({
          comment: comment,
          rating: rating
        }),
        config,
      );
      await dispatch(getProductInfo(_id));
    }
    sendData();
  };

  if (!isAuthenticated) return (
    <div className="flex w-60 items-center px-5 py-2 rounded-md bg-black text-white">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 inline mr-2 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
      Login to write a review
    </div>
  )
  return (
    <Dialog>
      <DialogTrigger className="flex items-center px-5 py-2 rounded-md bg-black text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 inline mr-2 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
        Write a review
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write a review...</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mx-auto mb-5 grid w-full items-center gap-1.5">
            <Label htmlFor="kv" className="text-black">
              Give a rating:
            </Label>
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <div className="mx-auto mb-5 grid w-full items-center gap-1.5">
            <Label htmlFor="kv" className="text-black">
              Write a comment:
            </Label>
            <Textarea
              value={comment}
              onChange={handleCommentLen}
              maxLength={400}
              placeholder="Type something..."
              className="text-black h-32" />
          </div>
          <DialogFooter className="mx-auto w-full">
            <DialogClose asChild>
              <button type="submit" className="float-right text-center w-24 rounded-md bg-black px-5 py-2 text-white">
                Submit
              </button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
NewReview.propTypes = {
  _id: propTypes.string.isRequired,
};

const StarRating = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  const handleMouseOver = (index) => {
    setHover(index);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  const handleClick = (index) => {
    setRating(index);
  };

  return (
    <div>
      {[...Array(5)].map((star, index) => {
        index += 1;

        return (
          <span
            key={index}
            onClick={() => handleClick(index)}
            onMouseOver={() => handleMouseOver(index)}
            onMouseLeave={handleMouseLeave}
          >
            {index <= (hover || rating) ? <svg viewBox="0 0 24 24" fill="black" className="h-6 inline w-6" >
              <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
            </svg>
              :
              <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="h-6 inline w-6" >
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>}
          </span>
        );
      })}
    </div>
  );
};
