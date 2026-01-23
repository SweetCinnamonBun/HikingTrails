import React from "react";
import { GoArrowBoth } from "react-icons/go";
import { IoTimeOutline } from "react-icons/io5";

const Card = () => {
  return (
    <div className="bg-white rounded-3xl border border-black overflow-hidden">
      <figure className="h-56 w-full overflow-hidden">
        <img
          className="h-full w-full object-cover"
          src="https://recipevaultstorage.blob.core.windows.net/recipevaultcontainer/10349454-9b5e-4b81-94ab-b3e19082fa71.jpg"
          alt="Korpinkierros, Nuuksio National Park"
        />
      </figure>

      <div className="p-4 space-y-2">
        <h3 className="text-xl font-semibold">
          Korpinkierros, Nuuksio National Park
        </h3>

        <div className="difficulty">
          <span className="px-4 text-sm py-1 rounded-lg bg-red-300">Easy</span>
        </div>

        <div className="basic-info text-md flex items-center gap-4">
          <span className="flex items-center gap-1">
            <GoArrowBoth /> 8.8 km
          </span>
          <span className="flex items-center gap-1">
            <IoTimeOutline /> 4 h
          </span>
        </div>

        <div className="description text-gray-700 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
          expedita sit, nemo, voluptates repellendus aperiam unde delectus
          officiis voluptatem dolores recusandae minima in quibusdam quidem?
        </div>
      </div>
    </div>
  );
};

export default Card;
