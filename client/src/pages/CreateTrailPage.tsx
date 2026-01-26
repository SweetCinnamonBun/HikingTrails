import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { Difficulty, Region } from "../types/trail";

type CreateTrailFormValues = {
  name: string;
  description: string;
  image: FileList;
  lengthInKm: number;
  durationInMinutes: number;
  difficultyId: string;
  regionId: string;
};

// ✅ STATIC DIFFICULTIES LIST
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

const CreateTrailPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateTrailFormValues>();

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 🔁 Replace later with real data
  const regions: Region[] = [];

  const onSubmit = async (data: CreateTrailFormValues) => {
    try {
      let imageUrl: string | undefined;

      if (data.image?.[0]) {
        imageUrl = URL.createObjectURL(data.image[0]);
      }

      const payload = {
        name: data.name,
        description: data.description,
        imageUrl,
        lengthInKm: data.lengthInKm,
        durationInMinutes: data.durationInMinutes,
        difficultyId: data.difficultyId,
        regionId: data.regionId,
      };

      console.log("CreateTrailDto:", payload);
    } catch (error) {
      console.error("Failed to create trail", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 border-2 border-gray-300 rounded-2xl my-10">
      <h1 className="text-4xl font-bold mb-8">Create new trail</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Name */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Trail name</label>
          <input
            className="bg-gray-100 px-4 py-3 rounded-xl"
            placeholder="Nuuksio Lake Trail"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-sm text-red-500">Name is required</span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Description</label>
          <textarea
            rows={5}
            className="bg-gray-100 px-4 py-3 rounded-xl resize-none"
            {...register("description", { required: true })}
          />
        </div>

        {/* Image */}
        <div className="flex flex-col gap-3">
          <label className="font-semibold">Trail image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setPreviewImage(URL.createObjectURL(file));
              }
            }}
          />

          {previewImage && (
            <img
              src={previewImage}
              alt="Trail preview"
              className="h-56 w-full max-w-md object-cover rounded-xl border-2 border-dotted"
            />
          )}
        </div>

        {/* Length & Duration */}
        <div className="flex gap-6">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">Length (km)</label>
            <input
              type="number"
              step="0.1"
              className="bg-gray-100 px-4 py-3 rounded-xl w-48"
              {...register("lengthInKm", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold">Duration (minutes)</label>
            <input
              type="number"
              className="bg-gray-100 px-4 py-3 rounded-xl w-48"
              {...register("durationInMinutes", { required: true })}
            />
          </div>
        </div>

        {/* Difficulty */}
        <div className="flex flex-col gap-2 max-w-xs">
          <label className="font-semibold">Difficulty</label>
          <select
            className="bg-gray-100 px-4 py-3 rounded-xl"
            {...register("difficultyId", { required: true })}
          >
            <option value="">Select difficulty</option>
            {difficulties.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 max-w-xs">
          <label className="font-semibold">Region</label>
          <select
            className="bg-gray-100 px-4 py-3 rounded-xl"
            {...register("regionId", { required: true })}
          >
            <option value="">Select region</option>
            {regions.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 text-white w-full py-3 rounded-xl hover:bg-green-700 disabled:opacity-50"
        >
          Create trail
        </button>
      </form>
    </div>
  );
};

export default CreateTrailPage;
