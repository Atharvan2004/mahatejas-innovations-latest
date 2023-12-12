import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { useLocation } from "react-router-dom";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { logoutUser } from "@/actions/userActions";
import logoImg from "@/assets/images/logo.png";
import SearchProduct from "./SearchProduct";

const navigation = {
  categories: [
    {
      id: "products",
      name: "Products",
      sections: [
        {
          id: "airplane",
          name: "Airplane",
          items: [
            { name: "Lite Series", href: "/category/Airplane/0" },
            { name: "Medium Series", href: "/category/Airplane/1" },
            { name: "Heavy Series", href: "/category/Airplane/2" },
          ],
        },
        {
          id: "multi-motor",
          name: "Multi Motor",
          items: [
            { name: "Lite Series", href: "/category/Multimotor/0" },
            { name: "Medium Series", href: "/category/Multimotor/1" },
            { name: "Heavy Series", href: "/category/Multimotor/2" },
          ],
        },
        {
          id: "esc",
          name: "ESC",
          items: [
            { name: "Lite Series", href: "/category/Esc/0" },
            { name: "Medium Series", href: "/category/Esc/1" },
            { name: "Heavy Series", href: "/category/Esc/2" },
          ],
        },
        {
          id: "propeller",
          name: "propeller",
          items: [
            { name: "Lite Series", href: "/category/Propeller/0" },
            { name: "Medium Series", href: "/category/Propeller/1" },
            { name: "Heavy Series", href: "/category/Propeller/2" },
          ],
        },
        {
          id: "fpv",
          name: "FPV",
          items: [
            { name: "Lite Series", href: "/category/Fpv/0" },
            { name: "Medium Series", href: "/category/Fpv/1" },
            { name: "Heavy Series", href: "/category/Fpv/2" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "OEM/ODM", href: "/oem-odm" },
    { name: "Contact", href: "/contact" },
    { name: "About", href: "/about" },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [productTabOpen, setProductTabOpen] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <div className="mb-10 bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden " onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300 ease-linear"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300 ease-linear"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition duration-300 ease-in-out"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition duration-300 ease-in-out"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-col pb-12 shadow-xl">
                <div className="flex px-4 justify-end pb-2 pt-5">
                  <button
                    type="button"
                    className="relative  -m-2 inline-flex items-center justify-center rounded-md p-2 text2-col"
                    onClick={() => setOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group as="div" className="mt-2">
                  <div className="">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "text-slate-800"
                                : "border-transparent",
                              "whitespace-nowrap flex pr-1 py-4 link-col font-medium",
                            )
                          }
                          onClick={() => setProductTabOpen((prev) => !prev)}
                        >
                          {category.name}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 scale-75"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                            />
                          </svg>
                        </Tab>
                      ))}
                    </Tab.List>
                  </div>
                  {productTabOpen && (
                    <Tab.Panels as={Fragment}>
                      {navigation.categories.map((category) => (
                        <Tab.Panel
                          key={category.name}
                          className="space-y-5 px-4 pb-8 pt-5"
                        >
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p
                                id={`${category.id}-${section.id}-heading-mobile`}
                                className="font-medium text2-col"
                              >
                                {section.name}
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                className="mt-2 flex flex-col space-y-1"
                              >
                                {section.items.map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <a
                                      href={item.href}
                                      className="-m-2 block p-2 link-col"
                                    >
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>{" "}
                            </div>
                          ))}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  )}
                </Tab.Group>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <Link
                      to="/"
                      className="-m-2 block p-2 font-medium link-col"
                    >
                      Home
                    </Link>
                  </div>
                  {navigation.pages.map((page) => (
                    <div key={page.name} className="flow-root">
                      <Link
                        to={page.href}
                        className="-m-2 block p-2 font-medium link-col"
                      >
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        dispatch(logoutUser());
                      }}
                    >
                      Logout
                    </button>
                  ) : (
                    <>
                      <div className="flow-root">
                        <Link
                          to="/signin"
                          className="-m-2 block p-2 font-medium link-col"
                        >
                          Sign in
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link
                          to="/signup"
                          className="-m-2 block p-2 font-medium link-col"
                        >
                          Create account
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="bg-col relative bg-blue-500">
        <div className="flex h-7 items-center justify-center bg3-col px-5 lg:justify-between">
          <span className="hidden w-48 lg:inline"></span>
          <span className="text-sm text-col font-bold">
            Shipping Available to All Countries
          </span>
          <div className="hidden lg:block">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  dispatch(logoutUser());
                }}
                className="mr-2 text-col"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/signup" className="text-col">
                <b>Create an account</b>
                </Link>
                <span className="mx-2 text-col">|</span>
                <Link to="/signin" className="text-col">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>

        <nav
          aria-label="Top"
          className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8"
        >
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="relative rounded-md p-2 text2-col bg-none lg:hidden"
                onClick={() => setOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img className="h-8 w-auto hidden" src={logoImg} alt="" />
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  <Link
                    to="/"
                    className="flex items-center text-sm font-medium link-col"
                  >
                    Home
                  </Link>
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={classNames(
                                open
                                  ? "text-slate-600"
                                  : "border-transparent link-col",
                                "relative z-10 -mb-px flex items-center text-sm font-medium transition-colors duration-200 ease-out",
                              )}
                            >
                              {category.name}
                            </Popover.Button>
                          </div>

                          <Popover.Panel className="absolute inset-x-0 top-full bg-black text-sm text-gray-500">
                            {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                            <div
                              className="absolute inset-0 top-1/2 bg-white shadow"
                              aria-hidden="true"
                            />

                            <div className="relative z-10 bg-col">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="py-8">
                                  <div className="row-start-1 grid grid-cols-5 gap-x-8 gap-y-10 text-sm">
                                    {category.sections.map((section) => (
                                      <div key={section.name}>
                                        <p
                                          id={`${section.name}-heading`}
                                          className="font-medium text2-col"
                                        >
                                          {section.name}
                                        </p>
                                        <ul
                                          role="list"
                                          aria-labelledby={`${section.name}-heading`}
                                          className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                        >
                                          {section.items.map((item) => (
                                            <li
                                              key={item.name}
                                              className="flex"
                                            >
                                              <Link
                                                to={item.href}
                                                className="link-col"
                                              >
                                                {item.name}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </>
                      )}
                    </Popover>
                  ))}

                  {navigation.pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className="flex items-center text-sm font-medium link-col"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

                <div className="ml-auto flex items-center">
                  {isAuthenticated && (
                    <>
                      {/* Profile */}
                      <div className="flex lg:ml-6">
                        <Link to="/me" className="p-2 link-col">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                          </svg>
                        </Link>
                      </div>

                      {/* Cart */}
                      <div className="ml-4 flow-root lg:ml-6">
                        <Link
                          to="/cart"
                          className="group -m-2 flex items-center p-2"
                        >
                          <ShoppingBagIcon
                            className="h-6 w-6 flex-shrink-0 link-col"
                            aria-hidden="true"
                          />
                          <span className="ml-2 text-sm font-medium link-col">
                            {cart && cart.length}
                          </span>
                          <span className="sr-only">
                            items in cart, view bag
                          </span>
                        </Link>
                      </div>
                    </>
                  )}
                  <SearchProduct />
                </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
