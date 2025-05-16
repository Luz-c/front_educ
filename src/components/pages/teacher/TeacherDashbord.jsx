
import React from "react";
import Navbar from "../../navbar/Navbar";
import Sidebar from "../../sidebar/Sidebar";
import ExamCreator from "../../examCreator/ExamCreator";

const TeacherDashbord = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <ExamCreator />
      </div>
    </div>
  );
};

export default TeacherDashbord;
