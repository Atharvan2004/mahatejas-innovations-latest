import { useEffect, useState } from "react";
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

export default function AddKv({ p_id, kv = [23, 234, 431, 12] }) {
  const [selectedKv, setSelectedKv] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);

  const handleSetKv = async (event) => {
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
        `/admin/product/setKv/${p_id}`,
        JSON.stringify({
          kvImgs: imgUrl,
        }),
        config,
      );
    }
    sendData();
  };
  return (
    <Dialog>
      <DialogTrigger className="flex text-white rounded-md py-1 px-2 mr-2 mt-2 bg-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-6 mr-2 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        Set KV
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Set Product KV Images</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center">
          <Select onValueChange={(val) => setSelectedKv(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select KV" />
            </SelectTrigger>
            <SelectContent>
              {kv.map((val, index) => (
                <SelectItem key={index} value={val}>
                  {val}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {selectedKv && (
          <>
            <div className="flex justify-center mt-5">
              <ImgUpload setImgUrl={setImgUrl} />
            </div>
            <DialogFooter className="mx-auto w-full max-w-sm">
              <DialogClose asChild>
                <button
                  onClick={handleSetKv}
                  type="submit"
                  disabled={!imgUrl}
                  className="float-right rounded-md bg-black px-5 py-2 text-white"
                >
                  {imgUrl ? "Confirm" : " Upload image(s) first"}
                </button>
              </DialogClose>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
