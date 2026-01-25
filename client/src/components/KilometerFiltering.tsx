import React, { useState } from "react";

type KilometerRange = {
  min?: number;
  max?: number;
};

interface KilometerFilteringProps {
  value: KilometerRange;
  onChange: (value: KilometerRange) => void;
}

const KilometerFiltering: React.FC<KilometerFilteringProps> = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [fromKm, setFromKm] = useState<number | "">(value.min ?? "");
  const [toKm, setToKm] = useState<number | "">(value.max ?? "");

  return (
    <div className="relative w-56">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full px-4 py-2 hover:bg-gray-300 border border-gray-300 rounded-lg bg-white flex justify-between items-center"
      >
        <span className="text-sm">Kilometer</span>
        <span>▾</span>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 w-72 bg-white border border-gray-300 rounded-lg shadow-lg z-51">
          <div className="flex flex-col">
            <div className="flex">
              <label className="flex flex-col gap-1 px-4 py-3">
                <span className="text-sm text-gray-600">From (km)</span>
                <input
                  type="number"
                  min={0}
                  placeholder="0"
                  value={fromKm}
                  onChange={(e) =>
                    setFromKm(
                      e.target.value === "" ? "" : Number(e.target.value),
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </label>

              <label className="flex flex-col gap-1 px-4 py-3">
                <span className="text-sm text-gray-600">To (km)</span>
                <input
                  type="number"
                  min={0}
                  placeholder="0"
                  value={toKm}
                  onChange={(e) =>
                    setToKm(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                />
              </label>
            </div>
            <div className="self-end p-3">
              <button
                type="button"
                onClick={() => {
                  onChange({
                    min: fromKm === "" ? undefined : fromKm,
                    max: toKm === "" ? undefined : toKm,
                  });
                  setOpen(false);
                }}
                className="bg-green-200 px-4 py-2 rounded-lg border border-gray-400 hover:bg-green-300 cursor-pointer"
              >
                Apply filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KilometerFiltering;
