import { useState } from "react";

const ImgUpload = ({ setImgUrl }) => {
  // image is an array
  const [image, setCarousel] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const uploadAllImages = async () => {
    const urls = [];
    setLoading(true);
    image.forEach(async (img) => {
      const url = await uploadImage(img);
      url && urls.push(url);
    });
    setImgUrl(urls);
    setLoading(false);
  };

  const uploadImage = async (img) => {
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
    data.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME);
    data.append("folder", "Cloudinary-React");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: data,
        },
      );
      const res = await response.json();
      setUrl(res.public_id);
      return res.url;
    } catch (error) {
      return null;
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    for (let i = 0; i < files.length; i++) {
      if (files[i] && files[i].size > 120 * 1024) {
        alert(`${files[i].name} is too big!`);
        return;
      }
    }

    setCarousel(files);

    // Display image previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  const handleResetClick = () => {
    setPreview(null);
    setCarousel(null);
  };

  return (
    <div>
      <div>
        <header className="flex ">
          {!url && (
            <>
              <input
                id="hidden-input"
                type="file"
                className="hidden"
                onChange={handleImageChange}
                accept="image/*"
                multiple
              />
              <label
                htmlFor="hidden-input"
                className="mr-5 flex h-20 w-20 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-gray-400 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="gray"
                  className="h-6 w-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </>
          )}
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-4 h-6 w-6"></div>
              <span>Processing...</span>
            </div>
          ) : url ? (
            <div className="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="black"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
                />
              </svg>
              <p>Image Uploaded</p>
            </div>
          ) : (
            <div className="flex flex-col justify-evenly">
              <button
                onClick={uploadAllImages}
                className="rounded-sm px-3 py-1 bg-white border-2 border-black hover:bg-black hover:text-white text-black focus:shadow-outline focus:outline-none disabled:cursor-not-allowed"
                disabled={!image}
              >
                Upload now
              </button>
              <button
                onClick={handleResetClick}
                className="rounded-sm px-3 py-1 bg-black  text-white focus:shadow-outline focus:outline-none"
              >
                Reset
              </button>
            </div>
          )}
        </header>
        <div className="grid gap-x-1 mt-5 grid-cols-5">
          {preview &&
            preview.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="preview"
                className="h-20 w-20 object-cover"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ImgUpload;
