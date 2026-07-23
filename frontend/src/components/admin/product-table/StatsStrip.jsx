export const StatsStrip = ({displayedProducts, categories, lowStockCount}) =>{
    return(
        <>
        <div className="mb-8 grid gap-4 grid-cols-4">
          {[
            { label: "Total Products", value: displayedProducts.length },
            { label: "Categories", value: categories.length },
            { label: "Low Stock", value: lowStockCount, warn: true },
            {
              label: "Avg. Rating",
              value: displayedProducts.length
                ? (displayedProducts.reduce((s, p) => s + p.rating, 0) / displayedProducts.length).toFixed(2)
                : "0.00",
            },
          ].map((s) => (
            <div key={s.label} className="bg-card rounded-xl border border-border p-5 transition-shadow hover:shadow-md">
              <p className="text-sm text-muted-foreground font-medium">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.warn && s.value > 0 ? "text-[#95502E]" : "text-[#211E20]"}`}>
                {s.value}
              </p>
            </div>
          ))}
        </div>
        </>
    )
}