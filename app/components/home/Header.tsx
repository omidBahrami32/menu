import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import LanguageSelector from "./LanguageSelector";
import Link from "next/link";
import SearchModal from "./SearchModal";


const Header = ({ show }: { show: boolean }) => {
  return (
    <div className="flex flex-row gap-4 p-4">
      <LanguageSelector />

      {/* search icon and modal */}
      <Link href={`/?show=${true}`} className="flex cursor-pointer items-center rounded-full bg-secondary p-4 backdrop-blur-xl">
        <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" color="white" />
      </Link>
      {show && <SearchModal/>}
    </div>
  );
};

export default Header;
