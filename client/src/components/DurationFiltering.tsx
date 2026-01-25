import React, { useState } from "react";

interface DurationRange {
  min?: number;
  max?: number;
}

interface DurationFilteringProps {
  value?: DurationRange;
  onChange: (range: DurationRange) => void; 
  minDuration?: number;
  maxDuration?: number;
}

const DurationFiltering: React.FC<DurationFilteringProps> = ({
  value = {},
  onChange,
  minDuration = 0,
  maxDuration = 20,
}) => {
 
  const [tempRange, setTempRange] = useState<DurationRange>({
    min: value.min ?? minDuration,
    max: value.max ?? maxDuration,
  });

  const [open, setOpen] = useState(false);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (newMin <= (tempRange.max ?? maxDuration)) {
      setTempRange({ ...tempRange, min: newMin });
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (newMax >= (tempRange.min ?? minDuration)) {
      setTempRange({ ...tempRange, max: newMax });
    }
  };

  const handleApply = () => {
    onChange(tempRange);
    setOpen(false);
  };

  return (
    <div className="relative w-72">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-72 px-4 py-2 border border-gray-300 rounded-lg bg-white flex justify-between items-center"
      >
        <span className="text-sm">
          Duration ({tempRange.min} – {tempRange.max} hrs)
        </span>
        <span>▾</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-full z-50 bg-white border border-gray-300 rounded-lg shadow-md p-3">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 w-14">Min</label>
              <input
                type="range"
                min={minDuration}
                max={maxDuration}
                value={tempRange.min}
                onChange={handleMinChange}
                className="w-full"
              />
              <span className="w-10 text-right">{tempRange.min}h</span>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 w-14">Max</label>
              <input
                type="range"
                min={minDuration}
                max={maxDuration}
                value={tempRange.max}
                onChange={handleMaxChange}
                className="w-full"
              />
              <span className="w-10 text-right">{tempRange.max}h</span>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleApply} 
                className="bg-green-200 px-4 py-2 rounded-lg border border-gray-400 hover:bg-green-300"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DurationFiltering;
