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
  },
  {
    name:"My Requests",
    href:"/MyRequests"
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
  {
    name:"Add Book",
    href:"/Addbook"
  }
];

export const adminNavigation = [...userNavigation, ...adminOptions];
