import React from "react";
import { Edit, List, Eye, School, User, HelpCircle, LogOut } from "lucide-react";
import { cn } from "../../lib/utils";

const NavItem = ({ icon, label, active = false }) => (
  <div
    className={cn(
      "flex items-center gap-2 px-4 py-2 text-sm font-medium cursor-pointer",
      active ? "bg-gray-600/20" : "hover:bg-gray-600/10"
    )}
  >
    {icon}
    <span>{label}</span>
  </div>
);

const Navbar = () => {
  return (
    <nav className="bg-[#2a333d] text-white flex items-center justify-between px-4 h-14 w-full">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-[#2a333d] flex items-center justify-center mr-6">
          <div className="w-8 h-8 rounded-full bg-[#00b334] flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="flex">
          <NavItem icon={<Edit className="w-5 h-5" />} label="Nouvel examen" active={true} />
          <NavItem icon={<List className="w-5 h-5" />} label="Examens" />
          <NavItem icon={<Eye className="w-5 h-5" />} label="Surveillance / Résultats" />
          <NavItem icon={<School className="w-5 h-5" />} label="École" />
          <NavItem icon={<User className="w-5 h-5" />} label="Profil" />
          <NavItem icon={<HelpCircle className="w-5 h-5" />} label="Aide et Formation" />
        </div>
      </div>

      <div>
        <LogOut className="w-5 h-5 cursor-pointer" />
      </div>
    </nav>
  );
};

// navbar for students
export const StudentNavbar = () => {
  return (
    <nav className="bg-[#2a333d] text-white flex items-center justify-between px-4 h-14 w-full">
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-[#2a333d] flex items-center justify-center mr-6">
          <div className="w-8 h-8 rounded-full bg-[#00b334] flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        <div className="flex">
          <NavItem icon={<List className="w-5 h-5" />} label="Examens" />
          <NavItem icon={<User className="w-5 h-5" />} label="Profil" />
          <NavItem icon={<HelpCircle className="w-5 h-5" />} label="Aide et Formation" />
        </div>
      </div>

      <div>
        <LogOut className="w-5 h-5 cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
