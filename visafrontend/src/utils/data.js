import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export const SIDE_MENU_ADMIN_DATA = [
  { name: "Dashboard", href: "/dashboard", icon: FolderIcon, current: true },
  { name: "Enquiry", href: "/user", icon: ServerIcon, current: false },
  { name: "Referral", href: "/referral", icon: ServerIcon, current: false },
  { name: "Education", href: "/education", icon: SignalIcon, current: false },
  {
    name: "Marketing Promotion",
    href: "/martketing",
    icon: GlobeAltIcon,
    current: false,
  },
  {
    name: "Commission",
    href: "/commision",
    icon: ChartBarSquareIcon,
    current: false,
  },
  {
    name: "Master",
    href: "/master",
    icon: UsersIcon,
    current: false,
    children: [
      { name: "User", href: "#" },
      { name: "Roles and Permission", href: "#" },
      { name: "Customer Success", href: "#" },
    ],
  },
];

export const PRIORITY_DATA = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
];

export const STATUS_DATA = [
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];
