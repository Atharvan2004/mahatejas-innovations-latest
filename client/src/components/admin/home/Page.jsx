import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { logoutUser } from "@/actions/userActions";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import NewItem from "@/components/admin/home/NewItem";

export default function ManageHome() {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [addConfirm, setAddConfirm] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  async function updateImages() {
    setSubmitDisabled(true);

    const newArr = [];
    images.forEach((image_obj, index) => {
      newArr.push({ img: image_obj.img, index: index });
    });

    const res = await axios.post("/admin/setCarousel", {
      imageArray: newArr,
    });

    if (res.data.success) {
      alert("Images updated successfully");
    } else {
      alert("Something went wrong");
    }

    setImages(res.data.images);
    setSubmitDisabled(false);
  }

  useEffect(() => {
    async function getImages() {
      const res = await axios.get("/admin/getCarousel");
      setImages(res.data.imageArray);
    }
    getImages();
  }, []);

  useEffect(() => {
    if (newImages.length === 0) return;
    async function getNewImages() {
      const newArr = [];
      for (let i = 0; i < newImages.length; i++) {
        newArr.push({ img: newImages[i] });
      }
      setImages((prev) => {
        return [...newArr, ...prev];
      });
    }
    getNewImages();
  }, [newImages, addConfirm]);

  return (
    <>
      <div className="flex w-screen bg-slate-100">
        <Link to="/admin/manage-orders" className="px-5 py-3">
          Manage Orders
        </Link>
        <Link to="/admin/manage-products" className="px-5 py-3">
          Manage Products
        </Link>
        <Link to="/admin/manage-home" className="bg-slate-200 px-5 py-3">
          Manage Home
        </Link>
      </div>
      <div className="container mx-auto py-10">
        <div className="mb-10 flex justify-between">
          <div>
            <h1>Welcome Back!</h1>
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

        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Manage your Carousel Images
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <NewItem
            newImages={newImages}
            setNewImages={setNewImages}
            setAddConfirm={setAddConfirm}
          />
          {images.length > 0 &&
            images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  className="w-full aspect-square object-cover"
                  src={image.img}
                  alt="image"
                />
                {index !== 0 && (
                  <button
                    onClick={() => {
                      setImages((prev) => {
                        const newImages = [...prev];
                        [newImages[index], newImages[index - 1]] = [
                          newImages[index - 1],
                          newImages[index],
                        ];
                        return newImages;
                      });
                    }}
                    className="absolute top-0 right-[2rem] flex h-8 w-8 items-center justify-center bg-slate-800 bg-opacity-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="h-5 w-5"
                    >
                      <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
                    </svg>
                  </button>
                )}
                {index !== images.length - 1 && (
                  <button
                    onClick={() => {
                      setImages((prev) => {
                        const newImages = [...prev];
                        [newImages[index], newImages[index + 1]] = [
                          newImages[index + 1],
                          newImages[index],
                        ];
                        return newImages;
                      });
                    }}
                    className="absolute top-0 right-0 flex h-8 w-8 items-center justify-center bg-slate-800 bg-opacity-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="h-5 w-5"
                    >
                      <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
                    </svg>
                  </button>
                )}
                <button
                  onClick={() => {
                    // deletes image from array at index
                    setImages((prev) => {
                      const newImages = [...prev];
                      newImages.splice(index, 1);
                      return newImages;
                    });
                  }}
                  className="absolute bottom-3 border-white border-4 right-3 bg-white rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="black"
                    className="w-6  h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            ))}
        </div>
        <Button
          onClick={updateImages}
          disabled={submitDisabled}
          className="mt-5 w-[100%] md:w-[24%]"
        >
          Submit
        </Button>
      </div>
    </>
  );
}
