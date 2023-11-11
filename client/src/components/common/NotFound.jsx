import { Link } from "react-router-dom";
import Img from "@/assets/images/404.jpg";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img src={Img} alt="404" className="relative top-10 -z-10" />
      <p className="text-5xl font-extrabold text-slate-600">Whoops..</p>
      <p className="mb-5 text-slate-500">It looks like you are lost</p>
      <Link
        to="/"
        className="border border-slate-500 px-5 py-2 text-slate-500 hover:scale-x-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="mb-1 mr-1 inline h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
        Go back home
      </Link>
    </div>
  );
}
