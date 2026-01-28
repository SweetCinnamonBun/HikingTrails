import React from "react";
import { GoArrowBoth } from "react-icons/go";
import { IoTimeOutline } from "react-icons/io5";
import type { Trail } from "../types/trail";


interface CardProps {
  trail: Trail;
};

const Card: React.FC<CardProps> = ({ trail }) => {
  return (
    <div className="bg-white rounded-3xl border border-black overflow-hidden">
      <figure className="h-56 w-full overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src={trail?.imageUrl || "https://recipevaultstorage.blob.core.windows.net/recipevaultcontainer/10349454-9b5e-4b81-94ab-b3e19082fa71.jpg"}
          alt="Korpinkierros, Nuuksio National Park"
        />
      </figure>

      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold">{trail?.name}</h3>

        <div className="difficulty">
          <span className="px-4 text-sm py-1 rounded-lg bg-red-300">
            {trail?.difficulty?.name}
          </span>
        </div>

        <div className="basic-info text-md flex items-center gap-4">
          <span className="flex items-center gap-1">
            <GoArrowBoth /> {trail?.lengthInKm} km
          </span>
          <span className="flex items-center gap-1">
            <IoTimeOutline /> {trail?.durationInMinutes / 60} h
          </span>
        </div>

        <div className="description text-gray-700 text-sm">{trail?.description}</div>
      </div>
    </div>
  );
};

export default Card;
