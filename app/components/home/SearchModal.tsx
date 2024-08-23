"use client";
import { axiosInstance } from "@/services/api";
import {
  faAngleLeft,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@headlessui/react";
import { AnimatePresence, easeOut, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Item } from "../Interfaces";
import { toFarsiNumber } from "@/utils/tools";

const SearchModal = () => {
  const [searchInput, setSearch] = useState<string>("");
  const [results, setResults] = useState<Item[]>([]);

  useEffect(() => {
    const search = async () => {
      const res = await axiosInstance<Item[]>(
        `/api/item/search/${searchInput}`,
      );
      console.log(res.data);
      setResults(res.data);
    };
    const debounceTimer = setTimeout(() => {
      if (searchInput !== "") {
        search();
      } else {
        setResults([]);
      }
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchInput]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: easeOut }}
      >
        <div className="fixed inset-0 flex h-screen w-full items-start justify-center overflow-hidden bg-primary/20 backdrop-blur-sm sm:items-center">
          <div className="h-screen w-full rounded-md bg-primary-forground/20 px-2 py-6 lg:w-2/6">
            <div className="flex flex-col gap-3 text-center">
              {/* search box */}
              <div className="sticky flex h-14 items-center justify-between rounded-full border-4 border-secondary px-2">
                <div className="p-2">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    size="lg"
                    color="white"
                  />
                </div>
                <div className="mx-2 grow rounded-full">
                  <Input
                    type="text"
                    className="w-full rounded-full bg-secondary-foreground py-2 pr-3 text-white placeholder:text-white focus:outline-none"
                    placeholder="جست و جو در منو"
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                    value={searchInput}
                  />
                </div>
                <Link href="/" className="p-2">
                  <FontAwesomeIcon icon={faAngleLeft} size="lg" color="white" />
                </Link>
              </div>
              {/* results */}
              <div className="no-scrollbar flex h-[86vh] flex-col items-center gap-4 overflow-y-scroll">
                {results.length == 0 && (
                  <div className="flex items-center justify-center text-center">
                    آیتمی یافت نشد.
                  </div>
                )}
                {results.length > 0 &&
                  results.map((result) => (
                    <Link
                      href={`/menu?typeId=${result.type_id}&categoryId=${result.category}`}
                      key={result.id}
                      className="relative flex h-40 w-full cursor-pointer select-none items-center gap-x-3 rounded-2xl bg-white p-4"
                    >
                      <div className="flex items-center">
                        <Image
                          alt={result.title}
                          src={result.images[0].image_url}
                          height={250}
                          width={250}
                          className="h-[8rem] min-w-[7rem] max-w-[7rem] rounded-xl object-cover"
                        />
                      </div>
                      <div className="flex h-32 flex-col justify-between">
                        <div className="text-start">{result.title}</div>
                        <div className="h-[3.75rem] overflow-hidden text-start text-xs leading-5">
                          <p>{result.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <p>{toFarsiNumber(result.price)}</p>
                          <div className="flex flex-col items-center text-xs font-light leading-3">
                            {result.price < 1000 ? (
                              <p>
                                هزار <br /> تومان
                              </p>
                            ) : (
                              <p>
                                میلیون <br /> تومان
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SearchModal;
