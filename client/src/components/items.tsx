import React from 'react';

interface LabItem {
  name: string;
  brand: string;
  quantity: number;
  details: string;
}

interface LabItemCardProps {
  items: LabItem[];
}

const LabItemCard: React.FC<LabItemCardProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
            <div className="bg-blue-500 text-white p-2 rounded-full">
              {/* Icon representing lab equipment */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 3v8.883a3.001 3.001 0 00-.75 5.794V21h6v-3.323a3.001 3.001 0 00-.75-5.794V3m-4.5 0h6"
                />
              </svg>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-600">Brand: <span className="font-semibold">{item.brand}</span></p>
            <p className="text-gray-600">Quantity: <span className="font-semibold">{item.quantity}</span></p>
          </div>

          <div className="text-gray-500 text-sm">
            <p>{item.details}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LabItemCard;
