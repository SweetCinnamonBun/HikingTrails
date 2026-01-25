import React, { useState } from "react";
import type { Difficulty } from "../types/trail";



interface FilterDropdownProps {
  values: Difficulty[];
  onChange: (values: Difficulty[]) => void;
}

const FilterDropdownDifficulty: React.FC<FilterDropdownProps> = ({
  values,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const difficulties: Difficulty[] = [
  {
    id: "2a755f9c-9ee0-4865-b6fa-348bfa1959ba",
    name: "Easy",
  },
  {
    id: "72b0281e-31ec-4c8f-a4ea-337a4b9a4a64",
    name: "Medium",
  },
  {
    id: "7d633f68-0acf-482e-a1a3-7eb03689ec2f",
    name: "Hard",
  },
];

  const toggleDifficulty = (difficulty: Difficulty) => {

    const exists = values.some((x) => x.id === difficulty.id);
    const updated = exists 
    ? values.filter((x) => x.id !== difficulty.id)
    : [...values, difficulty] 

    onChange(updated);
  };

    

  return (
    <div className="relative w-56">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 hover:bg-gray-300 py-2 border cursor-pointer border-gray-300 rounded-lg bg-white flex justify-between items-center"
      >
        <span className="text-sm">
          {values.length > 0
            ? `Difficulty (${values.length})`
            : "Filter by difficulty"}
        </span>
        <span>▾</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {difficulties.map((diff) => (
            <label
              key={diff.id}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={values.some((x) => x.id === diff.id)}
                onChange={() => toggleDifficulty(diff)}
                className="accent-black"
              />
              <span>{diff.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdownDifficulty;
