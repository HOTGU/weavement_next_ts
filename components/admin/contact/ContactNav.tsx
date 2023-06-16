"use client";

import React from "react";
import StateSearch from "./StateSearch";
import Search from "./Search";
import PlusContact from "./PlusContact";

const ContactNav = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 py-4 justify-start items-center">
      <div className="flex gap-4">
        <PlusContact />
        <Search />
      </div>
      <StateSearch />
    </div>
  );
};

export default ContactNav;
