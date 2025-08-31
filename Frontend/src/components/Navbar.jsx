"use client";
import { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { logout } from "@/utils/Auth";
import {
  adminNavigation,
  guestNavigation,
  userNavigation,
} from "@/utils/Navlinks";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { accessToken, role, loading, removeAccess } = useContext(AuthContext);
  const [navigation, setNavigation] = useState([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!accessToken) {
      setNavigation(guestNavigation);
    } else if (role === "Admin") {
      setNavigation(adminNavigation);
    } else {
      setNavigation(userNavigation);
    }
  }, [accessToken, role, loading]);

  const logoutHandler = async () => {
    await logout();
    setTimeout(() => {
      removeAccess();
      router.push("/Login");
    }, 2000);
  };

  return (
    <Disclosure
      as="nav"
      className="backdrop-blur-lg bg-white/70 border-b border-gray-200 shadow-sm sticky top-0 z-50 transition-all"
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-teal-700 hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-9 w-auto"
                    src="/QuickLib logo1.png"
                    alt="Quicklib"
                  />
                </div>

                <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          isActive
                            ? "bg-teal-600 text-white"
                            : "text-teal-800 hover:bg-teal-100 hover:text-teal-900",
                          "rounded-md px-3 py-2 text-sm font-medium transition"
                        )}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full bg-white/70 p-1 text-teal-700 hover:text-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {accessToken && (
                  <Menu as="div" className="relative ml-4">
                    <div>
                      <Menu.Button className="flex rounded-full bg-teal-100 p-1 focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src="/account.png"
                          alt="User"
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-150"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-20">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/Profile"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/Settings"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block w-full text-left px-4 py-2 text-sm text-red-600"
                              )}
                              onClick={logoutHandler}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden px-2 pt-2 pb-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    isActive
                      ? "bg-teal-600 text-white"
                      : "text-teal-900 hover:bg-teal-100 hover:text-teal-900",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
