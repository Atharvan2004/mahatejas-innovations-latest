import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import propTypes from "prop-types";

import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import EmptyCartImg from "@/assets/images/emptyCart.png";
import OrderForm from "@/components/form/Order";
import { fetchCart, deleteItemsFromCart } from "@/actions/cartActions";
import IMG404 from "@/assets/images/img404.jpg";

export default function Cart() {
  const dispatch = useDispatch();

  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const { cart, total } = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    async function checkCart() {
      await dispatch(fetchCart());
      setPageLoading(false);
    }
    checkCart();
  }, [dispatch]);

  useEffect(() => {
    cart && cart.length > 0 ? setIsCartEmpty(false) : setIsCartEmpty(true);
  }, [cart]);

  if (pageLoading)
    return (
      <div className="flex min-h-screen w-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="flex min-h-screen w-screen flex-col justify-between">
      <Navbar />
      <div className="mx-auto w-full max-w-4xl">
        {/* Page Title */}
        <h1 className="mb-5 pl-5  font-bold lg:text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mb-2 mr-2 inline h-9 w-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          My Cart
        </h1>
        {isCartEmpty ? (
          <img src={EmptyCartImg} className="w-full" alt="empty cart" />
        ) : (
          <>
            {/* Cart items */}
            <div className="mb-10 px-5">
              {cart &&
                cart.map((item) => (
                  <>
                    <Separator />
                    <CartItem data={item} />
                  </>
                ))}
              {/* <CartItem /> */}
              <Separator />
            </div>
            {/* Summary */}
            <div className="mx-auto mb-10 flex w-full max-w-4xl flex-col items-end pr-5">
              <p>
                Sub-total: <b>&#8377; {total}</b>
              </p>
              <p className="mb-5 text-xl">
                Total (Including Taxes): <b>&#8377; {total}</b>
                {/* <b>&#8377; {Math.round(total * 1.13 * 100) / 100}</b> */}
              </p>
              <OrderForm />
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

const CartItem = ({ data }) => {
  const dispatch = useDispatch();

  function deleteItemhandler() {
    dispatch(deleteItemsFromCart(data && data.id));
  }

  return (
    <div className="items-center py-3 md:flex md:justify-between">
      <div className="flex w-full items-center justify-between md:w-[60%]">
        <img
          src={data && data.image[0] ? data.image[0] : IMG404}
          alt="product"
          className="mx-auto aspect-square h-28 object-cover"
        />
        <div className="w-2/3 md:w-full">
          <p className="text-2xl font-bold">{data && data.name}</p>
          <div className="flex w-full justify-between pr-5 md:justify-start">
            <p className="mr-5 text-xl">
              <b>Quantity:</b>&nbsp;{data && data.quantity && data.quantity}
            </p>
            <p className="text-xl">
              <b>KV:</b>&nbsp;{data && data.selectedKv}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <button className="mr-5" onClick={deleteItemhandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="black"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
        <p className="my-2 mr-5 text-right text-xl">
          &#8377; {data && data.price && data.price}
        </p>
      </div>
    </div>
  );
};
CartItem.propTypes = {
  data: propTypes.object,
};
