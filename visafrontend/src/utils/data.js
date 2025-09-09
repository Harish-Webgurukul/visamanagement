

import {
  ChartBarSquareIcon,   // For reports / analytics
  Cog6ToothIcon,        // For settings
  FolderIcon,           // For dashboard
  GlobeAltIcon,         // For countries
  ServerIcon,           // For user / role
  SignalIcon,           // For permissions
  XMarkIcon,            // Close or delete
  UsersIcon,            // For people / groups
  DocumentTextIcon,     // For documents
  QuestionMarkCircleIcon, // For enquiry
  ClipboardDocumentListIcon, // For followup
  LinkIcon,             // For share link
  BellIcon,             // For notifications
  ShieldCheckIcon,      // For audit log / security
  IdentificationIcon,   // For customer docs
  BriefcaseIcon         // For visa purposes/options
} from "@heroicons/react/24/outline";

export const SIDE_MENU_ADMIN_DATA = [
  { name: "Dashboard", href: "/dashboard", icon: FolderIcon, current: true },
  // { name: "Enquiry", href: "/enquiry", icon: UsersIcon, current: false },
  { name: "Role", href: "/role", icon: ServerIcon, current: false },
  { name: "Permission", href: "/permission", icon: SignalIcon, current: false },
  {
    name: "Country",
    href: "/country",
    icon: GlobeAltIcon,
    current: false,
  },
  {
    name: "Visa Purpose",
    href: "/visaPurpose",
    icon: BriefcaseIcon,
    current: false,
  },
  {
    name: "Visa Option",
    href: "/visaoption",
    icon: ChartBarSquareIcon,
    current: false,
  },
  {
    name: "Document",
    href: "/document",
    icon: DocumentTextIcon,
    current: false,
  },
  {
    name: "Enquiry",
    href: "/enquiry",
    icon: QuestionMarkCircleIcon,
    current: false,
  },
  {
    name: "Follow Up",
    href: "/followup",
    icon: ClipboardDocumentListIcon,
    current: false,
  },
  {
    name: "Customer Doc",
    href: "/customerDocs",
    icon: IdentificationIcon,
    current: false,
  },
  {
    name: "Share Link",
    href: "/sharelink",
    icon: LinkIcon,
    current: false,
  },
  {
    name: "Notification",
    href: "/notification",
    icon: BellIcon,
    current: false,
  },
  {
    name: "Audit Log",
    href: "/auditLog",
    icon: ShieldCheckIcon,
    current: false,
  },
];
