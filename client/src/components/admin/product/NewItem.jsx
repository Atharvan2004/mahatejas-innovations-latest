import { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
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
import ImgUpload from "../../common/ImgUpload";

const catOptions = ["Multimotor", "Airplane", "Esc", "Fpv", "Propeller"];
const typeOptions = {
  Multimotor: ["Lite Series", "Medium Series", "Heavy Series"],
  Airplane: ["Lite Series", "Medium Series", "Heavy Series"],
  Esc: ["Lite Series", "Medium Series", "Heavy Series"],
  Fpv: ["Lite Series", "Medium Series", "Heavy Series"],
  Propeller: ["Lite Series", "Medium Series", "Heavy Series"],
};

export default function NewItem() {
  const [imgUrl, setImgUrl] = useState(null);
  const [selectedCat, setSelectedCat] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [minQuantity, setMinQuantity] = useState("");
  const [kv, setKv] = useState("");

  const handleAddProduct = async (event) => {
    event.preventDefault();

    // dont send if images not set
    if (!imgUrl) {
      alert("Please upload an image");
      return;
    }

    async function sendData() {
      // Send data to backend
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        "/admin/product/create",
        JSON.stringify({
          // backend using opposite naming for type and category
          type: selectedCat,
          name: name,
          description: description,
          price: price,
          kv: kv.split(','),
          weight: weight,
          min_quantity: minQuantity,
          category: selectedType,
          image_url: imgUrl,
        }),
        config,
      );
    }
    sendData();
  };
  return (
    <Dialog>
      <DialogTrigger className="flex flex-col md:h-[440px] items-center justify-center border-2 border-dashed border-black bg-white hover:bg-slate-100">
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
        <div className="flex justify-center">
          <ImgUpload setImgUrl={setImgUrl} />
        </div>
        <form onSubmit={handleAddProduct}>
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
              <button
                type="submit"
                disabled={!imgUrl}
                className="float-right rounded-md bg-black px-5 py-2 text-white"
              >
                {imgUrl ? "Add" : " Upload image(s) first"}
              </button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
