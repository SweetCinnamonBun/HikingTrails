import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import type { Trail } from "../types/trail";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);
  const [trails, setTrails] = useState<Trail[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (debouncedQuery.length === 0) return;

    const controller = new AbortController();

    (async () => {
      try {
        const url =
          `/api/trails?filterOn=Name&filterQuery=${encodeURIComponent(
            debouncedQuery
          )}`;

        const response = await fetch(url, { signal: controller.signal });
        const data = await response.json();

        setTrails(data);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Search failed", error);
        }
      }
    })();

    return () => controller.abort();
  }, [debouncedQuery]);

  const handleSelect = (trail: Trail | null) => {
    if (trail?.id) {
      navigate(`/trail/${trail.id}`);
    }
  };

  const trailNames = debouncedQuery.length === 0 ? [] : trails;

  return (
    <div className="relative mr-3 w-full">
      <Combobox onChange={handleSelect} onClose={() => setQuery("")}>
        <div className="relative">
          <FaSearch className="absolute left-4 top-3 h-5 w-5 text-gray-500" />
          <ComboboxInput
            placeholder="Search trails"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full h-12 px-12 text-base text-black bg-white rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>

        {trailNames.length > 0 && (
          <ComboboxOptions className="absolute z-50 w-full py-2 mt-2 overflow-y-auto text-sm bg-white border border-gray-300 max-h-80 rounded-xl shadow-lg">
            {trailNames.map((trail, index) => (
              <ComboboxOption
                key={trail.id}
                value={trail}
                className={`cursor-pointer px-5 py-2 data-focus:bg-green-100 ${
                  index !== trailNames.length - 1 ? "border-b" : ""
                }`}
              >
                {trail.name}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        )}
      </Combobox>
    </div>
  );
}
