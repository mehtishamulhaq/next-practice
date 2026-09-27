import { navbarData } from '@/constants';
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className="flex w-screen items-center justify-end  px-20 py-2 mb-8 shadow-xl bg-white sticky  top-0">
      {navbarData.map((navItem) => {
        const Icon = navItem.icon;
        return (
          <Link
            key={navItem.id}
            href={navItem.link}
            className="text-lg min-w-20  text-center font-bold text-teal-600 hover:text-teal-700 hover:hover:text-teal-900 hover:bg-slate-200 rounded-lg px-4 py-2 flex gap-2 items-center cursor-pointer"
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
