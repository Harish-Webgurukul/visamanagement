import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { SIDE_MENU_ADMIN_DATA } from "../utils/data";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const DesktopSidedbar = () => {
  // const { user } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState(SIDE_MENU_ADMIN_DATA);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     // check whether the loggedin user is admin or user
  //     // setSideMenuData(
  //     //   user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA
  //     // );
  //   }
  //   return () => {};
  // }, [user]);

  return (
    <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-50 px-6 ring-1 ring-gray-200">
        <div className="flex h-16 shrink-0 items-center text-center">
          <span className="text-indigo-500 font-bold text-2xl">
            Visa Management
          </span>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {sideMenuData.map((item) => (
                  <li key={item.name}>
                    {!item.children ? (
                      <Link
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-100 text-indigo-600"
                            : "text-gray-700 hover:bg-gray-100 hover:text-indigo-600",
                          "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          className={classNames(
                            item.current
                              ? "text-indigo-600"
                              : "text-gray-400 group-hover:text-indigo-600",
                            "size-6 shrink-0"
                          )}
                        />
                        {item.name}
                      </Link>
                    ) : (
                      <Disclosure as="div">
                        <DisclosureButton
                          className={classNames(
                            item.current
                              ? "text-indigo-600"
                              : "text-gray-400 group-hover:text-indigo-600",
                            "group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm/6 font-semibold text-gray-700 hover:text-indigo-600"
                          )}
                        >
                          <item.icon
                            aria-hidden="true"
                            className="size-6 shrink-0 text-gray-400 hover:text-indigo-600"
                          />
                          {item.name}
                          <ChevronRightIcon
                            aria-hidden="true"
                            className="ml-auto size-5 shrink-0 text-gray-400 group-data-open:rotate-90 group-data-open:text-gray-500"
                          />
                        </DisclosureButton>
                        <DisclosurePanel as="ul" className="mt-1 px-2">
                          {item.children.map((subItem) => (
                            <li key={subItem.name}>
                              <DisclosureButton
                                as="a"
                                href={subItem.href}
                                className={classNames(
                                  subItem.current
                                    ? "bg-gray-50"
                                    : "hover:bg-gray-50",
                                  "block rounded-md py-2 pr-2 pl-9 text-sm/6 text-gray-700"
                                )}
                              >
                                {subItem.name}
                              </DisclosureButton>
                            </li>
                          ))}
                        </DisclosurePanel>
                      </Disclosure>
                    )}
                  </li>
                ))}
              </ul>
            </li>

            <li className="-mx-6 mt-auto">
              <a
                href="#"
                className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-gray-900 hover:bg-gray-100"
              >
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full bg-gray-100 outline -outline-offset-1 outline-black/5"
                />
                <span className="sr-only">Your profile</span>
                <span aria-hidden="true">Tom Cook</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DesktopSidedbar;
