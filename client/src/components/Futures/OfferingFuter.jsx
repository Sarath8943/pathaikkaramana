import React from "react";

export const OfferingFuter = ({ title, image, items }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-3 hover:shadow-lg transition-shadow flex flex-col h-full">
      <img
        src={image}
        alt={title}
        className="mx-auto w-14 h-14 mb-2 rounded-full object-cover shadow-md border-2 border-amber-400"
      />
      <h2 className="text-lg font-semibold text-neutral-700 mb-2 text-center">
        {title}
      </h2>

      <div className="flex-1 overflow-auto space-y-1">
        {items?.map((item, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0"
          >
            <span className="text-gray-700 text-sm">{item.name}</span>
            <span className="text-indigo-700 font-semibold text-sm">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferingFuter;
