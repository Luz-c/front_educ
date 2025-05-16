import React from "react";
import { Edit, CircleDot } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="bg-[#2a333d] w-16 min-h-[calc(100vh-3.5rem)] flex flex-col items-center py-4">
      <button className="w-10 h-10 bg-[#2a333d] border border-gray-600 hover:bg-gray-700 rounded flex items-center justify-center mb-6">
        <Edit className="w-5 h-5 text-white" />
      </button>
      <button className="w-10 h-10 bg-[#2a333d] border border-gray-600 hover:bg-gray-700 rounded flex items-center justify-center">
        <CircleDot className="w-5 h-5 text-white" />
      </button>
    </div>
  );
};

export default Sidebar;