import React, { useState } from "react";
import { GoArrowBoth } from "react-icons/go";
import { IoLocation, IoTimeOutline } from "react-icons/io5";
import Card from "../components/Card";
import FilterDropdownDifficulty from "../components/FilterDropdownDifficulty";
import { useQuery } from "@tanstack/react-query";
import agent from "../lib/api/agent";
import KilometerFiltering from "../components/KilometerFiltering";
import DurationFiltering from "../components/DurationFiltering";
import SearchBox from "../components/SearchBox";
import SelectedFilter from "../components/SelectedFilter"; // ✅ import
import { BarLoader, BeatLoader, ClimbingBoxLoader, ClipLoader, FadeLoader, HashLoader, MoonLoader, PropagateLoader, PuffLoader, RiseLoader, SyncLoader } from "react-spinners";


import type { Difficulty, Trail } from "../types/trail";
import NoResults from "../components/NoResults";

type KilometerRange = {
  min?: number;
  max?: number;
};

interface DurationRange {
  min?: number;
  max?: number;
}

type Filters = {
  search?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  isAscending?: boolean;
  difficulties: Difficulty[];
  kilometers?: KilometerRange;
  duration?: DurationRange;
};

const HomePage = () => {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    page: 1,
    pageSize: 50,
    sortBy: "createdAt",
    isAscending: false,
    difficulties: [],
    kilometers: {},
    duration: {},
  });

  const difficultyQuery = filters.difficulties.map(
    (x) => `difficulties=${encodeURIComponent(x.name)}`,
  );
  const kilometerQuery = [
    filters.kilometers?.min !== undefined
      ? `minKm=${filters.kilometers.min}`
      : null,
    filters.kilometers?.max !== undefined
      ? `maxKm=${filters.kilometers.max}`
      : null,
  ].filter(Boolean);
  const durationQuery = [
    filters.duration?.min !== undefined
      ? `minDuration=${filters.duration.min}`
      : null,
    filters.duration?.max !== undefined
      ? `maxDuration=${filters.duration.max}`
      : null,
  ].filter(Boolean);

  const queryString = [
    ...difficultyQuery,
    ...kilometerQuery,
    ...durationQuery,
  ].join("&");

  const { data: trails, isLoading: isLoadingTrails } = useQuery(
    {
      queryKey: ["trails", filters],
      queryFn: async () => {
        const response = await agent.get(`/api/trails?${queryString}`);
        return response.data as Trail[];
      },
    },
  );

  // handle change functions
  const handleDifficultyChange = (values: Difficulty[]) => {
    setFilters((prev) => ({ ...prev, difficulties: values, page: 1 }));
  };

  const handleKilometersChange = (range: KilometerRange) => {
    setFilters((prev) => ({ ...prev, kilometers: range, page: 1 }));
  };

  const handleDurationChange = (range: DurationRange) => {
    setFilters((prev) => ({
      ...prev,
      duration: {
        min: range.min ? range.min * 60 : undefined,
        max: range.max ? range.max * 60 : undefined,
      },
      page: 1,
    }));
  };

  return (
    <div className="lg:px-14">
      <section className="bg-green-200">
        <div
          className="h-[300px] sm:h-[300px] lg:h-[500px] bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://recipevaultstorage.blob.core.windows.net/recipevaultcontainer/10349454-9b5e-4b81-94ab-b3e19082fa71.jpg')",
          }}
        >
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
        <div className="mb-20 flex items-center justify-between">
          <h2 className="text-2xl">Awesome trails in Helsinki</h2>
          <div className="w-1/2">
            <SearchBox />
          </div>
        </div>

        {/* Filters */}
        <div className="filters flex gap-5 mb-4 justify-end">
          <FilterDropdownDifficulty
            values={filters.difficulties}
            onChange={handleDifficultyChange}
          />
          <KilometerFiltering
            value={filters.kilometers ?? {}}
            onChange={handleKilometersChange}
          />
          <DurationFiltering
            value={filters.duration}
            onChange={handleDurationChange}
            minDuration={0}
            maxDuration={10}
          />
        </div>
        <div className="flex flex-wrap gap-3 mb-6">
          {filters.difficulties.map((difficulty) => (
            <SelectedFilter
              key={difficulty.id}
              label={`Difficulty: ${difficulty.name}`}
              onRemove={() =>
                setFilters((prev) => ({
                  ...prev,
                  difficulties: prev.difficulties.filter(
                    (d) => d.id !== difficulty.id,
                  ),
                  page: 1,
                }))
              }
            />
          ))}
          {(filters.kilometers?.min !== undefined ||
            filters.kilometers?.max !== undefined) && (
            <SelectedFilter
              label={`Kilometers: ${filters.kilometers.min ?? 0}–${filters.kilometers.max ?? "∞"} km`}
              onRemove={() =>
                setFilters((prev) => ({ ...prev, kilometers: {}, page: 1 }))
              }
            />
          )}
          {(filters.duration?.min !== undefined ||
            filters.duration?.max !== undefined) && (
            <SelectedFilter
              label={`Duration: ${filters.duration.min ? filters.duration.min / 60 : 0}–${filters.duration.max ? filters.duration.max / 60 : "∞"} h`}
              onRemove={() =>
                setFilters((prev) => ({ ...prev, duration: {}, page: 1 }))
              }
            />
          )}
        </div>
        {isLoadingTrails ? (
          <div className="w-full h-150 rounded-4xl bg-gray-100 flex items-center justify-center">
            <PuffLoader color="#3bcc1e" loading={isLoadingTrails} />
          </div>
        ) : trails?.length ? (
          <div className="grid grid-cols-3 gap-4">
            {trails.map((trail: Trail) => (
              <Card key={trail.id} trail={trail} />
            ))}
          </div>
        ) : (
          <div className="w-full bg-gray-100 h-150 flex items-center justify-center rounded-lg">
            <NoResults message="No trails match your filters" />
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;
