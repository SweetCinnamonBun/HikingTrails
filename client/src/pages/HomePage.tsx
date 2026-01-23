import React from "react";
import { IoLocation, IoTimeOutline } from "react-icons/io5";

const HomePage = () => {
  return (
    <div className="lg:px-44">
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
            <h2 className="text-white text-4xl font-bold">Hiking trails in Helsinki</h2>
            <span className="text-xl flex items-center gap-1 text-white"><IoLocation /> Finland</span>
          </div>
          </div>
        </div>
      </section>
      <section>
        Filters section
      </section>
      <section>
        <div className="">
            <figure>
                <img src="https://recipevaultstorage.blob.core.windows.net/recipevaultcontainer/10349454-9b5e-4b81-94ab-b3e19082fa71.jpg" alt="" />
            </figure>
            <figure>
                <img src="https://recipevaultstorage.blob.core.windows.net/recipevaultcontainer/10349454-9b5e-4b81-94ab-b3e19082fa71.jpg" alt="" />
            </figure>
            <div className="card-body">
                <h3>Korpinkierros, Nuuksio National Park</h3>
                <div className="difficulty">
                    <span className="px-4 text-sm py-1 rounded-lg bg-red-300">Easy</span>
                </div>
                <div className="basic-info">
                    <span className="flex items-center gap-1"><IoTimeOutline /> 4 h</span>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
