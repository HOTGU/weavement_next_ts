"use client";

import React from "react";
import StateSearch from "./StateSearch";
import Search from "./Search";
import PlusContact from "./PlusContact";

const ContactNav = () => {
  return (
    <div className="flex gap-2 sm:gap-6 py-4 justify-start items-center">
      <PlusContact />
      <Search />
      <StateSearch />
    </div>
  );
};

export default ContactNav;
