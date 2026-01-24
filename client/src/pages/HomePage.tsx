import React, { useState } from "react";
import { GoArrowBoth } from "react-icons/go";
import { IoLocation, IoTimeOutline } from "react-icons/io5";
import Card from "../components/Card";
import FilterDropdownDifficulty from "../components/FilterDropdownDifficulty";
import { useTrails } from "../lib/hooks/useTrails";
import type { Trail } from "../types/trail";

type Difficulty = "Easy" | "Medium" | "Hard";

type Filters = {
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  isAscending?: boolean;
  difficulties: Difficulty[];
};

const HomePage = () => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    page: 1,
    pageSize: 50,
    sortBy: "createdAt",
    isAscending: false,
    difficulties: [],
  });

  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "">("");

  const handleDifficultyChange = (values: Difficulty[]) => {
    setFilters((prev) => ({
      ...prev,
      difficulties: values,
      page: 1, 
    }));
  };

  const { trails } = useTrails();

  console.log(trails)
  

  return (
    <div className="lg:px-14">
      <section className="bg-green-200">
        <div
          className="h-[300px] sm:h-[300px] lg:h-[500px] bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://recipevaultstorage.blob.core.windows.net/recipevaultcontainer/10349454-9b5e-4b81-94ab-b3e19082fa71.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          {/* Optional overlay or content */}
          <div className="h-full w-full bg-black/30 flex items-end">
            <div className="ml-10 mb-10 space-y-3">
              <h2 className="text-white text-4xl font-bold">
                Hiking trails in Finland
              </h2>
              <span className="text-xl flex items-center gap-1 text-white">
                <IoLocation /> Finland
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-14">
        <div className="mb-10">
          <h2 className="text-2xl">Awesome trails in Helsinki</h2>
        </div>
        <div className="filters">
          <FilterDropdownDifficulty  values={filters.difficulties} onChange={handleDifficultyChange} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          {trails?.map((trail: Trail) => (
            <Card trail={trail} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
