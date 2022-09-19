import React from "react";
import {
  ShoppingBagIcon,
  ChevronDownIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import {
  ClockIcon,
  CalendarIcon,
  UsersIcon,
  DesktopComputerIcon,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import SidebarRow from "./SidebarRow";

function Sidebar() {
  const {data:session, loading} = useSession();
  return (
    <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px]">
      
      <SidebarRow src={session.user.image} title={session.user.name} />
      <SidebarRow Icon={UsersIcon} title="Find Friends" />
      <SidebarRow Icon={UserGroupIcon} title="Groups" />
      <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
      <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
      <SidebarRow Icon={ClockIcon} title="Memories" />
      <SidebarRow Icon={CalendarIcon} title="Events" />
      <SidebarRow Icon={ChevronDownIcon} title="See More" />
    </div>
  );
}

export default Sidebar;
