import { useState } from "react";
import axios from "axios";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const catOptions = ["Multimotor", "Airplane", "Esc", "Fpv", "Propeller"];
const typeOptions = {
  Multimotor: ["Lite Series", "Medium Series", "Heavy Series"],
  Airplane: ["Lite Series", "Medium Series", "Heavy Series"],
  Esc: ["Lite Series", "Medium Series", "Heavy Series"],
  Fpv: ["Lite Series", "Medium Series", "Heavy Series"],
  Propeller: ["Lite Series", "Medium Series", "Heavy Series"],
};

export default function NewItem() {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [kv, setKv] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [minQuantity, setMinQuantity] = useState("");

  const handleImageUpload = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    // Display the preview of the selected image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = (event) => {
    event.preventDefault();

    async function sendData() {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { res } = await axios.post(
        "/admin/product/create",
        JSON.stringify({
          // backend using opposite naming for type and category
          type: selectedCat,
          name: name,
          description: description,
          price: price,
          kv: kv.split(","),
          weight: weight,
          min_quantity: minQuantity,
          category: selectedType,
          image: previewImage,
        }),
        config,
      );
    }
    sendData();
  };
  return (
    <Dialog>
      <DialogTrigger className="flex flex-col items-center justify-center border-2 border-dashed border-black bg-white hover:bg-slate-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="black"
          className="h-6 w-6"
        >
          <path
            fillRule="evenodd"
            d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25v2.25a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V10.5z"
            clipRule="evenodd"
          />
        </svg>
        Add new Product
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAddProduct}>
          <div className="mb-5 flex justify-center">
            <label
              htmlFor="file-upload"
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
              <input
                onChange={handleImageUpload}
                id="file-upload"
                name="file-upload"
                type="file"
                className="hidden"
              />
            </label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="h-20 w-20 object-cover"
              />
            )}
          </div>
          <div className="mx-auto mb-5 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name" className="text-black">
              Product name
            </Label>
            <Input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              className="text-black"
            />
          </div>
          <div className="mx-auto mb-5 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="description" className="text-black">
              Description
            </Label>
            <Textarea
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              className="text-black"
            />
          </div>
          <div className="mx-auto mb-5 grid w-full max-w-sm grid-cols-3 gap-x-4">
            <div>
              <Label htmlFor="price" className="text-black">
                Price
              </Label>
              <Input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                id="price"
                className="text-black"
              />
            </div>
            <div>
              <Label htmlFor="minQuantity" className="text-black">
                Min Quantity
              </Label>
              <Input
                type="number"
                onChange={(e) => setMinQuantity(e.target.value)}
                id="minQuantity"
                className="text-black"
              />
            </div>
            <div>
              <Label htmlFor="weight" className="text-black">
                Weight
              </Label>
              <Input
                type="number"
                onChange={(e) => setWeight(e.target.value)}
                id="weight"
                className="text-black"
              />
            </div>
          </div>
          <div className="mx-auto mb-5 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="kv" className="text-black">
              KV Array
            </Label>
            <Input
              type="text"
              placeholder="100,150,220,..."
              onChange={(e) => setKv(e.target.value)}
              id="kv"
              className="text-black"
            />
          </div>
          <div className="mx-auto mb-5 grid w-full max-w-sm grid-cols-2 gap-x-4">
            <Select onValueChange={(val) => setSelectedCat(val)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {catOptions.map((cat, index) => (
                  <SelectItem key={index} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(val) => setSelectedType(val)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {selectedCat &&
                  typeOptions[selectedCat].map((type, index) => (
                    <SelectItem key={index} value={type}>
                      {type}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="mx-auto w-full max-w-sm">
            <DialogClose asChild>
              <button type="submit" className="float-right w-20 rounded-md bg-black px-5 py-2 text-white">
                Add
              </button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
