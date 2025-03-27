import { FiSearch, FiUser } from "react-icons/fi";




const Sidebar = () => {
 

  

  return (
    <div className="w-full  max-h-20 p-5">
      <div className="flex items-center justify-between">   
               <div className="relative">
                 <span className="absolute  left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                   <FiSearch />
                 </span>
                 <input
                   type="text"
                   placeholder="Search for reports..."
                   className="pl-10 pr-4 py-2 rounded-lg w-[60vw] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                 />
               </div>
               <div className="flex items-center space-x-2">
                 <span className="w-6 h-6 text-gray-600">
                   <FiUser />
                 </span>
                 <span className="text-gray-800 font-medium">Gbolade Akintunmi</span>
               </div>
             </div>
    </div>
  );
};

export default Sidebar;