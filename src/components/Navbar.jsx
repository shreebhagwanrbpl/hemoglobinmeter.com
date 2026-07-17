"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const pathParts = pathname
    .split("/")
    .filter(Boolean);

  const staticRoutes = [
    "about",
    "services",
    "items",
    "contact",
  ];

  const district =
    pathParts.length > 0 &&
      !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const makeLink = (path) => {
    if (!district) return path;

    if (path === "/") {
      return `/${district}`;
    }

    return `/${district}${path}`;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/items" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-teal-100/50 bg-white/80 backdrop-blur-xl">

      <div className="container-custom flex h-20 items-center justify-between">

        {/* Logo */}
        <Link href={makeLink("/")}>
          <h1 className="text-xl font-bold md:text-2xl">

            <span className="bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#14B8A6] bg-clip-text text-transparent">
              Central
            </span>

            <span className="text-slate-900">
              {" "}Biomedicals
            </span>

          </h1>
        </Link>


        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 text-[15px] font-medium text-slate-700 lg:flex">

          {navLinks.map((link) => (

            <Link
              key={link.name}
              href={makeLink(link.path)}
              className="relative transition-all duration-300 hover:text-[#0F766E]"
            >
              {link.name}

            </Link>

          ))}

        </nav>


        {/* Desktop Button */}
        <div className="hidden lg:block">

          <Link href={makeLink("/contact")}>

            <button
              className="
          rounded-xl
          bg-gradient-to-r
          from-[#0F766E]
          via-[#0D9488]
          to-[#14B8A6]
          px-7
          py-3
          font-semibold
          text-white
          shadow-lg
          shadow-teal-200
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
          hover:shadow-teal-300
          "
            >
              Get Quote
            </button>

          </Link>

        </div>


        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-xl p-2 text-[#0F766E] transition hover:bg-teal-50 lg:hidden"
        >

          {menuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}

        </button>


      </div>


      {/* Mobile Menu */}

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen
          ? "max-h-[500px]"
          : "max-h-0"
          }`}
      >

        <div className="border-t border-teal-100 bg-white/95 p-6 backdrop-blur-xl">


          <nav className="flex flex-col gap-5 font-medium text-slate-700">


            {navLinks.map((link) => (

              <Link
                key={link.name}
                href={makeLink(link.path)}
                onClick={() => setMenuOpen(false)}
                className="transition hover:text-[#0F766E]"
              >

                {link.name}

              </Link>

            ))}



            <Link
              href={makeLink("/contact")}
              onClick={() => setMenuOpen(false)}
            >

              <button
                className="
            mt-3
            w-full
            rounded-xl
            bg-gradient-to-r
            from-[#0F766E]
            via-[#0D9488]
            to-[#14B8A6]
            px-6
            py-3
            font-semibold
            text-white
            shadow-lg
            shadow-teal-200
            "
              >

                Get Quote

              </button>

            </Link>


          </nav>


        </div>


      </div>


    </header>
  );
}