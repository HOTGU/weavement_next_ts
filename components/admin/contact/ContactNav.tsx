import React from "react";

import StateSearch from "./StateSearch";
import ButtonNav from "./ButtonNav";
import SearchResult from "./SearchResult";

const ContactNav = () => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-2 sm:gap-6 py-4 justify-start items-start md:items-center">
      <div className="flex gap-2">
        <ButtonNav />
        <SearchResult />
      </div>
      <StateSearch />
    </div>
  );
};

export default ContactNav;
