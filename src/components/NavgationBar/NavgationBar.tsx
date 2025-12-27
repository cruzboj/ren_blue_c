import React from "react";
//https://www.youtube.com/watch?v=VcLXh9EdVs0

function Nav(props : { children: React.ReactNode }) {
  return (
    <>
      <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col fixed p-4">
        {props.children}
      </aside>
    </>
  );
}

export default Nav;
