import { Hammer, Menu, Newspaper, PhoneCall, Swords, Users, Quote, UserRoundSearch, Blocks, Factory } from "lucide-react";
import Link from "next/link";
import React from "react";

const Sidebar = () => {
  const menus = [
    {
      name: "Insight",
      link: "/insight",
      icon: <Newspaper size={20} />,
    },
    {
      name: "Works",
      link: "/works",
      icon: <Swords size={20} />,
    },
    {
      name: "Careers",
      link: "/careers",
      icon: <Users size={20} />,
    },
    {
      name: "Job Applications",
      link: "/job-applications",
      icon: <UserRoundSearch size={20} />,
    },
    {
      name: "Services",
      link: "/services",
      icon: <Hammer size={20} />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: <PhoneCall size={20} />,
    },
    {
      name: "Testimonial",
      link: "/testimonial",
      icon: <Quote size={20} />,
    },
    {
      name: "Industries",
      link: "/industries",
      icon: <Factory size={20} />,
    },
    {
      name: "Category",
      link: "/category",
      icon: <Blocks size={20} />,
    },
  ];

  return (
    <nav className="border-r shadow min-w-56 h-full py-3 px-4">
      {/* Logo section */}
      <div className="flex justify-between items-center">
        <Link href={"/admin"}>
          <span className="logo font-bold text-xl">Horatio</span>
        </Link>
        <span className="cursor-pointer">
          <Menu />
        </span>
      </div>

      {/* Navigation */}

      <ul className="mt-5 flex flex-col gap-y-5 text-base">
        {menus.map((menu) => (
          <li key={menu.name}>
            <Link className="flex gap-2" href={`/admin${menu.link}`}>
              {menu.icon}
              <span>{menu.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
