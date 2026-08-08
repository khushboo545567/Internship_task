// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Sidebar() {
//   const navigate = useNavigate();

//   return (
//     <aside className="w-64 min-h-screen bg-gray-900 p-4 text-white">
//       <h2 className="mb-6 px-4 text-xl font-bold">Admin Panel</h2>

//       <nav className="space-y-2">
//         <button
//           onClick={() => navigate("/")}
//           className="block w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-800"
//         >
//           Dashboard
//         </button>

//         <button
//           onClick={() => navigate("/products")}
//           className="block w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-800"
//         >
//           Products
//         </button>

//         <button
//           onClick={() => navigate("/orders")}
//           className="block w-full rounded-lg px-4 py-3 text-left transition hover:bg-gray-800"
//         >
//           Orders
//         </button>
//       </nav>
//     </aside>
//   );
// }

// export default Sidebar;

import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-full shrink-0 bg-gray-900 p-4 text-white md:min-h-screen md:w-64 md:p-5">
      <h2 className="mb-5 text-xl font-bold sm:text-2xl">Admin Panel</h2>

      <nav className="flex gap-2 overflow-x-auto md:block md:space-y-2">
        <button
          onClick={() => navigate("/")}
          className="block shrink-0 rounded-lg px-4 py-3 text-left transition hover:bg-gray-800 md:w-full"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/products")}
          className="block shrink-0 rounded-lg px-4 py-3 text-left transition hover:bg-gray-800 md:w-full"
        >
          Products
        </button>

        <button
          onClick={() => navigate("/orders")}
          className="block shrink-0 rounded-lg px-4 py-3 text-left transition hover:bg-gray-800 md:w-full"
        >
          Orders
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
