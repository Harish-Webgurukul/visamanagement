
import {
  ChartBarSquareIcon,   
  Cog6ToothIcon,        
  FolderIcon,           
  GlobeAltIcon,         
  ServerIcon,           
  SignalIcon,            
  XMarkIcon,            
  UsersIcon,            
  DocumentTextIcon,     
  QuestionMarkCircleIcon, 
  ClipboardDocumentListIcon, 
  LinkIcon,             
  BellIcon,             
  ShieldCheckIcon,      
  IdentificationIcon,   
  BriefcaseIcon         
} from "@heroicons/react/24/outline";

export const SIDE_MENU_ADMIN_DATA = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: FolderIcon,
    current: true
  },
  {
    name: "Master",
    icon: UsersIcon,
    current: false,
    children: [
      { name: "User", href: "/user", icon: ServerIcon },
      { name: "Role", href: "/role", icon: Cog6ToothIcon },
      { name: "Permission", href: "/permission", icon: SignalIcon },
      { name: "Country", href: "/country", icon: GlobeAltIcon },
      { name: "Visa Purpose", href: "/visaPurpose", icon: BriefcaseIcon },
      { name: "Visa Option", href: "/visaoption", icon: ChartBarSquareIcon }
    ]
  },
  {
    name: "Documents",
    icon: DocumentTextIcon,
    current: false,
    children: [
      { name: "Document", href: "/document", icon: DocumentTextIcon },
      { name: "Customer Doc", href: "/customerDocs", icon: IdentificationIcon }
    ]
  },
  {
    name: "Enquiry",
    href: "/enquiry",
    icon: QuestionMarkCircleIcon,
    current: false
  },
  {
    name: "Follow Up",
    href: "/followup",
    icon: ClipboardDocumentListIcon,
    current: false
  },
  {
    name: "Share Link",
    href: "/sharelink",
    icon: LinkIcon,
    current: false
  },
  {
    name: "Notification",
    href: "/notification",
    icon: BellIcon,
    current: false
  },
  {
    name: "Audit Log",
    href: "/auditLog",
    icon: ShieldCheckIcon,
    current: false
  }
];
