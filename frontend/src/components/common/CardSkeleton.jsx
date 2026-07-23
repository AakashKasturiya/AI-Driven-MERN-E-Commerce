export const CardSkeleton = () => {
  return (
    <div className="bg-white shadow-md overflow-hidden rounded-2xl border border-gray-100 flex flex-col h-full animate-pulse">
      {/* Product Image Placeholder */}
      <div className="aspect-[2/2] bg-gray-200 w-full" />

      {/* Product Details Placeholder */}
      <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag Placeholder */}
          <div className="h-3 bg-gray-200 rounded w-1/4 mb-2" />

          {/* Title Placeholder */}
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-1" />
          <div className="h-5 bg-gray-200 rounded w-1/2" />
        </div>

        {/* Price & Rating Row Placeholder */}
        <div className="flex items-center justify-between mt-4">
          <div className="h-5 bg-gray-200 rounded w-1/5" />
          <div className="h-4 bg-gray-200 rounded w-1/6" />
        </div>
      </div>
    </div>
  );
};
