import React, { useState } from "react";

type Difficulty = "Easy" | "Medium" | "Hard";

interface FilterDropdownProps {
  values: Difficulty[];
  onChange: (values: Difficulty[]) => void;
}

const FilterDropdownDifficulty: React.FC<FilterDropdownProps> = ({
  values,
  onChange,
}) => {
  const [open, setOpen] = useState(false);

  const difficulties: Difficulty[] = ["Easy", "Medium", "Hard"];

  const toggleDifficulty = (difficulty: Difficulty) => {
    const updated = values.includes(difficulty)
      ? values.filter((d) => d !== difficulty)
      : [...values, difficulty];

    onChange(updated);
  };

  return (
    <div className="relative w-56">
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white flex justify-between items-center"
      >
        <span className="text-sm">
          {values.length > 0
            ? `Difficulty (${values.length})`
            : "Filter by difficulty"}
        </span>
        <span>▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          {difficulties.map((diff) => (
            <label
              key={diff}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={values.includes(diff)}
                onChange={() => toggleDifficulty(diff)}
                className="accent-black"
              />
              <span>{diff}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdownDifficulty;
