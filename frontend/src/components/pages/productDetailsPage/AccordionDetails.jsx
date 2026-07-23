import { useState } from "react";

export const AccordionDetails = ({ product }) => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = (section) => {
        setIsOpen((prev) => (prev === section ? null : section));
    }
    
    return (
       <>
         <div className="border-t border-gray-100">
              <div className="border-b border-gray-100">
                <button onClick={()=>toggleAccordion("Description")} className="w-full flex items-center justify-between py-4 text-left">
                  <span className="font-medium text-charcoal text-sm">
                    Description
                  </span>
                  <i className={`${isOpen === "Description" ? 'ri-subtract-line' : 'ri-add-line'} text-charcoal transition-transform`} />
                </button>
                {isOpen ==="Description" && (
                <div
                  className="overflow-hidden"
                  style={{ height: "auto", opacity: 1 }}
                >
                  <div className="pb-4 text-sm text-medium-gray leading-relaxed">
                   {product.description}
                  </div>
                </div>
                )}
              </div>
              <div className="border-b border-gray-100">
                <button onClick={()=>toggleAccordion("Tags")} className="w-full flex items-center justify-between py-4 text-left">
                  <span className="font-medium text-charcoal text-sm">
                    Tags
                  </span>
                   <i className={`${isOpen === "Tags" ? 'ri-subtract-line' : 'ri-add-line'} text-charcoal transition-transform`} />
                </button>
                {isOpen === "Tags" && (
                 <div
                  className="overflow-hidden"
                  style={{ height: "auto", opacity: 1 }}
                >
                  <div className="pb-4 text-sm text-medium-gray leading-relaxed">
                   {product.tags.map((tag)=>(
                    <span key={tag} className="inline-block bg-orange-100 px-2 py-1 rounded-md mr-2">{tag}</span>))}
                  </div>
                </div>
                )}
              </div>
              <div className="border-b border-gray-100">
                <button onClick={()=>toggleAccordion("Shipping")} className="w-full flex items-center justify-between py-4 text-left">
                  <span className="font-medium text-charcoal text-sm">
                    Shipping &amp; Returns
                  </span>
                  <i className={`${isOpen === "Shipping" ? 'ri-subtract-line' : 'ri-add-line'} text-charcoal transition-transform`} />
                </button>
                {isOpen === "Shipping" && (
                 <div
                  className="overflow-hidden"
                  style={{ height: "auto", opacity: 1 }}
                >
                  <div className="pb-4 text-sm text-medium-gray leading-relaxed">
                   {product.shippingInformation}
                  </div>
                </div>
                )}
              </div>
            </div>
       </>
    )
}