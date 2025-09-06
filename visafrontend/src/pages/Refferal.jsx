import React, { useEffect } from "react";
import { HomeIcon } from "@heroicons/react/20/solid";

const people = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    department: "Optimization",
    email: "lindsay.walton@example.com",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Courtney Henry",
    title: "Designer",
    department: "Intranet",
    email: "courtney.henry@example.com",
    role: "Admin",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Tom Cook",
    title: "Director of Product",
    department: "Directives",
    email: "tom.cook@example.com",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Whitney Francis",
    title: "Copywriter",
    department: "Program",
    email: "whitney.francis@example.com",
    role: "Admin",
    image:
      "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Leonard Krasner",
    title: "Senior Designer",
    department: "Mobility",
    email: "leonard.krasner@example.com",
    role: "Owner",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Floyd Miles",
    title: "Principal Designer",
    department: "Security",
    email: "floyd.miles@example.com",
    role: "Member",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
const pages = [{ name: "Dashboard", href: "#", current: false }];

const Refferal = () => {
  const getAccessToken = async () => {};

  useEffect(() => {
    getAccessToken();
  });
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-4">
      <div className="sm:flex sm:items-center">
        <h3 className="text-base font-semibold text-gray-900">
          {" "}
          <nav aria-label="Breadcrumb" className="flex">
            <ol role="list" className="flex items-center space-x-4">
              <li>
                <div>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
                    <span className="sr-only">Home</span>
                  </a>
                </div>
              </li>
              {pages.map((page) => (
                <li key={page.name}>
                  <div className="flex items-center">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="size-5 shrink-0 text-gray-300"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                    <a
                      href={page.href}
                      aria-current={page.current ? "page" : undefined}
                      className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                    >
                      {page.name}
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </h3>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="relative min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th scope="col" className="py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {people.map((person) => (
                  <tr key={person.email}>
                    <td className="py-5 pr-3 pl-4 text-sm whitespace-nowrap sm:pl-0">
                      <div className="flex items-center">
                        <div className="size-11 shrink-0">
                          <img
                            alt=""
                            src={person.image}
                            className="size-11 rounded-full"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {person.name}
                          </div>
                          <div className="mt-1 text-gray-500">
                            {person.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                      <div className="text-gray-900">{person.title}</div>
                      <div className="mt-1 text-gray-500">
                        {person.department}
                      </div>
                    </td>
                    <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                        Active
                      </span>
                    </td>
                    <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                      {person.role}
                    </td>
                    <td className="py-5 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Edit<span className="sr-only">, {person.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refferal;
