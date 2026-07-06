"use client";
const ShopProductSkeleton = () => {
  return (
    <div className="border p-4 rounded-lg shadow-md flex flex-col justify-between h-full animate-pulse">
      <div>
        <div className="relative w-full h-64 mb-4 bg-gray-300 rounded-lg"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-5 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>
      </div>
      <div className="h-10 bg-gray-300 rounded-full w-1/2 mx-auto"></div>
    </div>
  );
};

export default ShopProductSkeleton;