import React from "react";

import StateSearch from "./StateSearch";
import ButtonNav from "./ButtonNav";
import SearchResult from "./SearchResult";

const ContactNav = () => {
  return (
    <div className="flex gap-2 sm:gap-6 py-4 justify-start items-center">
      <ButtonNav />
      <SearchResult />
      <StateSearch />
    </div>
  );
};

export default ContactNav;
