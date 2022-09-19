import Image from "next/image";
import React from "react";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon, //
  UserGroupIcon, //
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "../components/HeaderIcon";
import { signOut, useSession } from "next-auth/react";

function Header() {
  const { data: session, status } = useSession();
  return (
    <div className="sticky top-0 z-50 shadow-md p-2 flex items-center bg-white lg:px-5  ">
      {/* left */}
      <div className="flex items-center">
        <Image
          src="https://links.papareact.com/5me"
          width={40}
          height={40}
          layout="fixed"
        />

        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          <SearchIcon className="h-6 text-gray-600" />
          <input
            className="hidden md:inline-flex ml-2 items-center bg-transparent placeholder-gray-500 outline-none flex-shrink"
            type="text"
            placeholder="Search Facebook"
          />
        </div>
      </div>
      {/* center */}

      <div className="flex justify-center flex-grow">
        <div className="flex space-x-6 md:space-x-2">
          <HeaderIcon active Icon={HomeIcon} />
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      {/* right */}
      <div className="flex items-center sm:space-x-2 justify-end">
        <p className="hidden font-semibold whitespace-nowrap ml-1 pr-3">
          {session.user.name.length > 15
            ? `${session.user.name.substring(0, 15)}...`
            : `${session.user.name}`}
        </p>
        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <BellIcon className="icon" />
        {/* <ChevronDownIcon className="icon"/> */}

        {/* profile pic */}
        <div>
          <Image
            className="rounded-full cursor-pointer inline-flex"
            onClick={signOut}
            src={session?.user?.image}
            width={40}
            height={40}
            layout="fixed"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
