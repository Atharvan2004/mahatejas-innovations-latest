import { useState } from "react";
import axios from "axios";
import propTypes from "prop-types";
import ImgUpload from "../../common/ImgUpload";

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

const catOptions = ["Multimotor", "Airplane", "Esc", "Fpv", "Propeller"];
const typeOptions = {
  Multimotor: ["Lite Series", "Medium Series", "Heavy Series"],
  Airplane: ["Lite Series", "Medium Series", "Heavy Series"],
  Esc: ["Lite Series", "Medium Series", "Heavy Series"],
  Fpv: ["Lite Series", "Medium Series", "Heavy Series"],
  Propeller: ["Lite Series", "Medium Series", "Heavy Series"],
};

export default function EditItem({ pi, sc, st, na, de, k, pr, we, mq }) {
  const [imgUrl, setImgUrl] = useState(null);
  const [selectedCat, setSelectedCat] = useState("Multimotor");
  const [selectedType, setSelectedType] = useState("Lite Series");
  const [name, setName] = useState(na);
  const [description, setDescription] = useState(de);
  const [kv, setKv] = useState(k);
  const [price, setPrice] = useState(pr);
  const [weight, setWeight] = useState(we);
  const [minQuantity, setMinQuantity] = useState(mq);

  const [disableConfirm, setDisableConfirm] = useState(false);

  const handleEditProduct = (event) => {
    event.preventDefault();
    setDisableConfirm(true);

    // dont send if images not set
    if (!imgUrl) {
      alert("Please upload an image");
      return;
    }

    async function sendData() {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res=await axios.post(
        `/admin/product/update/${pi}`,
        JSON.stringify({
          // backend using opposite naming for type and category
          type: selectedCat,
          name: name,
          description: description,
          price: price,
          kv: kv.split(","),
          weight: weight,
          min_quantity: minQuantity,
          category: selectedType.split(" ")[0],
          image_url: imgUrl,
        }),
        config,
      );
      if (res.data.success) {
        alert("Product updated");
        window.location.reload();
      }else{
        alert("Something went wrong");
      }
    }
    sendData();
    setDisableConfirm(false);
  };
  return (
    <Dialog>
      <DialogTrigger className="mr-2 flex w-full items-center justify-center border-2 border-black px-5 py-2 font-bold hover:bg-black hover:text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-2 inline h-5 w-5"
        >
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
          <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
        </svg>
        Edit Product
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <p className="text-sm text-red-500">
            Warn: wait till it says upload complete.
          </p>
        </DialogHeader>
        <div className="flex justify-center">
          <ImgUpload setImgUrl={setImgUrl} />
        </div>
        <form onSubmit={handleEditProduct}>
          <div className="mx-auto mb-5 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name" className="text-black">
              Product name
            </Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-black"
            />
          </div>
          <div className="mx-auto mb-5 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="description" className="text-black">
              Description
            </Label>
            <Textarea
              value={description}
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
                value={price}
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
                value={minQuantity}
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
                value={weight}
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
              value={kv}
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
                disabled={disableConfirm || !imgUrl}
                type="submit"
                className="float-right w-24 rounded-md bg-black px-5 py-2 text-white"
              >
                Confirm
              </button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
EditItem.propTypes = {
  pi: propTypes.string,
  sc: propTypes.string,
  st: propTypes.string,
  na: propTypes.string,
  de: propTypes.string,
  k: propTypes.string,
  pr: propTypes.number,
  we: propTypes.number,
  mq: propTypes.number,
};
