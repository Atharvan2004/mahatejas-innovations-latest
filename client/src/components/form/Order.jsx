import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import PhoneInput from "react-phone-input-2";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { newOrder } from "@/actions/orderActions";
import { cartSlice } from "@/features/cartSlice";
const { EMPTY_CART } = cartSlice.actions;

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function OrderForm() {
  const dispatch = useDispatch();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  function handleSubmit() {
    dispatch(newOrder(phone, address));
    dispatch(EMPTY_CART())
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-black px-5 py-3 text-white">
        Create an order
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create an order</AlertDialogTitle>
          <div className="text-black">
            <p className="mb-5">
              We need a little more information for your order
            </p>
            <form>
              <label htmlFor="phone" className="text-slate-600">
                Phone No.
              </label>
              <PhoneInput
                className="mb-3"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                country={"in"}
                inputStyle={{ width: "100%", border: "1px solid #e2e8f0" }}
                inputProps={{
                  name: "phone",
                  required: true,
                }}
                regions={"asia"}
              />
              <label htmlFor="phone" className="text-slate-600">
                Shipping Address
              </label>
              <Textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </form>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Send</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
