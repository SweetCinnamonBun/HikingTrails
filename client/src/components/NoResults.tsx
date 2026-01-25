import React from "react";

interface NoResultsProps {
  message?: string;
}

const NoResults: React.FC<NoResultsProps> = ({ message = "No results found." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500 w-full">
      
      <span className="text-lg font-medium">{message}</span>
    </div>
  );
};

export default NoResults;
