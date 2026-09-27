'use client';

import { navbarData } from '@/constants';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavBar = () => {
  const pathName = usePathname();
  console.log('pathName', pathName);

  return (
    <nav className="flex w-screen items-center justify-end  px-20 py-2 mb-8 shadow-xl bg-white sticky  top-0">
      {navbarData.map((navItem) => {
        const Icon = navItem.icon;
        const isActive = pathName === navItem.link;

        return (
          <Link
            key={navItem.id}
            href={navItem.link}
            className={`text-lg min-w-20  text-center hover:text-teal-900 hover:font-bold hover:bg-slate-100 rounded-lg px-4 py-2 flex gap-2 items-center cursor-pointer ${isActive ? 'text-teal-800 font-bold scale-105 transition' : 'text-teal-600 font-semibold'}`}
          >
            {navItem.label}
            {Icon && <Icon />}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavBar;
