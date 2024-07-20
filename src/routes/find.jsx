import React from 'react';

export default function MedicalRecordsWebApp() {
  return (
    <div className="p-8 bg-blue-900 text-white">
      <h1 className="text-xl font-semibold text-left">Find Doctors or Hospitals</h1>
      <div className="p-4 mt-4 bg-gray-800 rounded-md">
        <h2 className="text-lg font-bold">Search for Doctors and Hospitals</h2>
        <input type="text" placeholder="Search..." className="w-full mt-2 p-2 border border-gray-300 rounded-md" />
      </div>
      <div className="p-4 mt-4 bg-gray-800 rounded-md">
        <h2 className="text-lg font-bold">Enter Your Symptoms</h2>
        <textarea rows={4} placeholder="Enter your symptoms..." className="w-full mt-2 p-2 border border-gray-300 rounded-md"></textarea>
      </div>
      <div className="flex flex-wrap mt-4 items-center">
        {/* Section for displaying doctors with profile picture */}
        {/* Implement this section by adding details of each doctor */}
      </div>
    </div>
  );
}
