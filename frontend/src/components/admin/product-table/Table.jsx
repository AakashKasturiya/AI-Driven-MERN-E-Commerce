import { Pencil, Trash2, Star, Package, Eye } from "lucide-react";

export const Table = ({
  pageItems,
  removeProduct,
  onEdit,
  onPreview,
  Chip,
  StockBadge,
}) => {
  return (

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-background-200/70 bg-background-100/50">
              <th className="py-3 px-4 text-left text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap">
                Product
              </th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap md:table-cell">
                Category
              </th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap sm:table-cell">
                Price
              </th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap">
                Stock
              </th>
              <th className="py-3 px-2 text-left text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap lg:table-cell">
                Rating
              </th>
              <th className="py-3 px-2 text-right text-xs font-semibold text-foreground-400 uppercase tracking-wider whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {pageItems.length === 0 && (
              <tr>
                <td colSpan={6} className="py-16 text-center">
                  <Package
                    className="mx-auto mb-3 text-foreground-300"
                    size={28}
                  />
                  <p className="text-sm text-foreground-500">
                    No products match your search.
                  </p>
                </td>
              </tr>
            )}

            {pageItems.map((p) => (
              <tr
                key={p._id || p.id}
                className="border-b border-background-100 hover:bg-background-100/50 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-background-100 flex items-center justify-center flex-shrink-0 overflow-hidden border border-background-200/70">
                      <img
                        src={p.thumbnail}
                        alt={p.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground-900 truncate max-w-[180px]">
                        {p.title}
                      </p>
                      <p className="text-xs text-foreground-400" >
                        {p.sku}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-2 whitespace-nowrap md:table-cell">
                  <Chip category={p.category} />
                </td>

                <td className="py-3 px-2 whitespace-nowrap sm:table-cell">
                  <span
                    className="text-sm font-semibold text-foreground-900"
                    
                  >
                    ${p.discountPrice.toFixed(2)}
                  </span>
                  {p.price !== p.discountPrice && (
                    <span
                      className="ml-1.5 text-xs text-foreground-400 line-through"
                      
                    >
                      ${p.price.toFixed(2)}
                    </span>
                  )}
                </td>

                <td className="py-3 px-2 whitespace-nowrap">
                  <StockBadge stock={p.stock} />
                </td>

                <td className="py-3 px-2 whitespace-nowrap lg:table-cell">
                  <span className="inline-flex items-center gap-1 text-sm text-foreground-900">
                    <Star
                      size={13}
                      className="fill-primary-500 text-primary-500"
                    />
                    {p.rating ?? "—"}
                  </span>
                </td>

                <td className="py-3 px-2 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1">
                    {onPreview && (
                      <button
                        onClick={() => onPreview(p)}
                        title="Preview"
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:text-primary-500 hover:bg-primary-50 transition-all duration-200 cursor-pointer"
                      >
                        <Eye size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => onEdit?.(p)}
                      title="Edit"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:text-foreground-700 hover:bg-background-100 transition-all duration-200 cursor-pointer"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => removeProduct(p)}
                      title="Delete"
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-400 hover:text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  );
};
