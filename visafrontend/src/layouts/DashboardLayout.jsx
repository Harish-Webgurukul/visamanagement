("use client");
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/20/solid";
import DesktopSidedbar from "../components/DesktopSidedbar";
import MobileSidebar from "../components/MobileSidebar";
import { UserContext } from "../context/userContext";

const DashboardLayout = () => {
  // check whether the user is loggedin every time state get change
  // useUserAuth();

  // const { clearUser } = useContext(UserContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div>
        <MobileSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Static sidebar for desktop */}
        <DesktopSidedbar />
        <div className="xl:pl-72">
          {/* Sticky search header */}
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-gray-200 bg-white px-4 shadow-xs sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-900 xl:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="size-5" />
            </button>

            <div className="flex flex-1 justify-end gap-x-4">
              <button
                type="button"
                className="rounded-md bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-xs hover:bg-indigo-100"
              >
                Logout
              </button>
            </div>
          </div>

          <main className="lg:pr-9">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
