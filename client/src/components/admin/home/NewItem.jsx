import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import ImgUpload from "../../common/ImgUpload";

export default function NewItem({ newImages, setNewImages,setAddConfirm }) {
  return (
    <Dialog>
      <DialogTrigger className="flex flex-col md:aspect-square items-center justify-center border-2 border-dashed border-black bg-white hover:bg-slate-100">
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
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
        Add new Image(s)
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Image(s)</DialogTitle>
          <p className="text-sm text-red-500">
            Warn: wait till it says upload complete.
          </p>
        </DialogHeader>
        <div className="flex justify-center">
          <ImgUpload setImgUrl={setNewImages} />
        </div>
        <DialogFooter className="mx-auto w-full max-w-sm">
          <DialogClose asChild>
            <button
              onClick={() => {
                setAddConfirm(true);
              }}
              type="submit"
              className="float-right rounded-md bg-black px-5 py-2 text-white"
            >
              Ok
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}