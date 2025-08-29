export const guestNavigation = [
  { name: "Home", href: "/" },
  { name: "Login", href: "/Login" },
];

export const userNavigation = [
  {
    name: "Search Books",
    href: "/Search-book",
  },
  {
    name: "Requests",
    href: "/Requests",
  },
  {
    name:"Chatbox",
    href:"/Chatbox"
  }
];

const adminOptions = [
  {
    name: "Dashboard",
    href: "/Dashboard",
  },
  {
    name: "Student",
    href: "/Student",
  },
];

export const adminNavigation = [...userNavigation, ...adminOptions];
