import { useState } from "react"
import { useCategory } from "../../../hooks/useCateogry";

export const Filter = () =>{

    const [categoryToggle, setCategoryToggle] = useState(false);
    const [priceToggle, setPriceToggle] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState("");

    const {categories, loading, error} = useCategory();

    console.log(selectedCategory)

    return(
        <>
            <aside className="hidden lg:block w-[260px] flex-shrink-0 sticky top-24 self-start">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal">
                    Filters
                  </h3>
                </div>
                <div>
                  <button onClick={()=>setCategoryToggle((prev)=> !prev)} className="flex items-center justify-between w-full mb-3 group">
                    <span className="text-sm font-semibold text-charcoal">
                      Category
                    </span>
                    <i className="ri-arrow-down-s-line text-medium-gray transition-transform rotate-180" />
                  </button>
                  <div
                    className="overflow-hidden"
                    style={{ height: "auto", opacity: 1 }}
                  >
                    {categoryToggle && (
                    <div className="space-y-2">
                      {categories?.map((item,index)=>(
                       <label key={index} className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${selectedCategory === item ? 'bg-charcoal border-charcoal' : 'bg-white border-gray-300'}`}>
                          <i className={`ri-check-line text-white text-xs ${selectedCategory === item ? 'block' : 'hidden'}`} />
                        </div>
                        <input
                          className="sr-only"
                          type="radio"
                          onChange={()=> setSelectedCategory(item)}
                          name={item}
                          checked={selectedCategory === item}
                        />
                        <span className="text-sm transition-colors text-charcoal font-medium">
                          {item}
                        </span>
                      </label>
                      ))}
                    </div>
                    )}

                  </div>
                </div>
                <div>
                  <button onClick={()=>setPriceToggle((prev)=> !prev)} className="flex items-center justify-between w-full mb-3 group">
                    <span className="text-sm font-semibold text-charcoal">
                      Price Range
                    </span>
                    <i className="ri-arrow-down-s-line text-medium-gray transition-transform rotate-180" />
                  </button>
                  {priceToggle && (
                  <div
                    className="overflow-hidden"
                    style={{ height: "auto", opacity: 1 }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <input
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-charcoal transition-colors"
                          placeholder="Min"
                          min="0"
                          type="number"
                          value="0"
                        />
                        <span className="text-medium-gray">—</span>
                        <input
                          className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-charcoal transition-colors"
                          placeholder="Max"
                          min="0"
                          type="number"
                          value="1000"
                        />
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <button className="px-3 py-1.5 text-xs rounded-full border transition-colors border-gray-200 text-medium-gray hover:border-charcoal hover:text-charcoal">
                          $0–$100
                        </button>
                        <button className="px-3 py-1.5 text-xs rounded-full border transition-colors border-gray-200 text-medium-gray hover:border-charcoal hover:text-charcoal">
                          $100–$200
                        </button>
                        <button className="px-3 py-1.5 text-xs rounded-full border transition-colors border-gray-200 text-medium-gray hover:border-charcoal hover:text-charcoal">
                          $200–$300
                        </button>
                        <button className="px-3 py-1.5 text-xs rounded-full border transition-colors border-gray-200 text-medium-gray hover:border-charcoal hover:text-charcoal">
                          $300–$500
                        </button>
                        <button className="px-3 py-1.5 text-xs rounded-full border transition-colors border-gray-200 text-medium-gray hover:border-charcoal hover:text-charcoal">
                          $500–$1000
                        </button>
                      </div>
                    </div>
                  </div>
                   )}
                </div>
                <div>
                  <button className="flex items-center justify-between w-full mb-3 group">
                    <span className="text-sm font-semibold text-charcoal">
                      Colors
                    </span>
                    <i className="ri-arrow-down-s-line text-medium-gray transition-transform rotate-180" />
                  </button>
                  <div
                    className="overflow-hidden"
                    style={{ height: "auto", opacity: 1 }}
                  >
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="group relative w-8 h-8 rounded-full border-2 transition-all border-gray-200 hover:border-charcoal"
                        style={{ backgroundColor: "rgb(26, 26, 26)" }}
                        title="Black"
                      ></button>
                      <button
                        className="group relative w-8 h-8 rounded-full border-2 transition-all border-gray-200 hover:border-charcoal"
                        style={{ backgroundColor: "rgb(245, 245, 245)" }}
                        title="White"
                      ></button>
                      <button
                        className="group relative w-8 h-8 rounded-full border-2 transition-all border-gray-200 hover:border-charcoal"
                        style={{ backgroundColor: "rgb(212, 196, 176)" }}
                        title="Beige"
                      ></button>
                      <button
                        className="group relative w-8 h-8 rounded-full border-2 transition-all border-gray-200 hover:border-charcoal"
                        style={{ backgroundColor: "rgb(193, 154, 107)" }}
                        title="Camel"
                      ></button>
                      <button
                        className="group relative w-8 h-8 rounded-full border-2 transition-all border-gray-200 hover:border-charcoal"
                        style={{ backgroundColor: "rgb(43, 58, 85)" }}
                        title="Navy"
                      ></button>
                      <button
                        className="group relative w-8 h-8 rounded-full border-2 transition-all border-gray-200 hover:border-charcoal"
                        style={{ backgroundColor: "rgb(143, 168, 146)" }}
                        title="Sage"
                      ></button>
                      <button
                        className="group relative w-8 h-8 rounded-full border-2 transition-all border-gray-200 hover:border-charcoal"
                        style={{ backgroundColor: "rgb(245, 198, 198)" }}
                        title="Blush"
                      ></button>
                      <button
                        className="group relative w-8 h-8 rounded-full border-2 transition-all border-gray-200 hover:border-charcoal"
                        style={{ backgroundColor: "rgb(156, 163, 175)" }}
                        title="Gray"
                      ></button>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="flex items-center justify-between w-full mb-3 group">
                    <span className="text-sm font-semibold text-charcoal">
                      Size
                    </span>
                    <i className="ri-arrow-down-s-line text-medium-gray transition-transform rotate-180" />
                  </button>
                  <div
                    className="overflow-hidden"
                    style={{ height: "auto", opacity: 1 }}
                  >
                    <div className="flex flex-wrap gap-2">
                      <button className="min-w-[40px] h-10 px-3 rounded-lg text-sm border transition-all border-gray-200 text-medium-gray hover:border-charcoal hover:text-charcoal">
                        XS
                      </button>
                      <button className="min-w-[40px] h-10 px-3 rounded-lg text-sm border transition-all border-gray-200 text-medium-gray hover:border-charcoal hover:text-charcoal">
                        S
                      </button>
                      <button className="min-w-[40px] h-10 px-3 rounded-lg text-sm border transition-all border-gray-200 text-medium-gray hover:border-charcoal hover:text-charcoal">
                        M
                      </button>
                      <button className="min-w-[40px] h-10 px-3 rounded-lg text-sm border transition-all border-gray-200 text-medium-gray hover:border-charcoal hover:text-charcoal">
                        L
                      </button>
                      <button className="min-w-[40px] h-10 px-3 rounded-lg text-sm border transition-all border-gray-200 text-medium-gray hover:border-charcoal hover:text-charcoal">
                        XL
                      </button>
                      <button className="min-w-[40px] h-10 px-3 rounded-lg text-sm border transition-all border-gray-200 text-medium-gray hover:border-charcoal hover:text-charcoal">
                        XXL
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
        </>
    )
}