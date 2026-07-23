import { Link } from "react-router-dom";

export const NoItemsFound = ({
    title = "No Products Found",
    description = "We couldn't find any products matching your search.",
    buttonText = "Continue Shopping",
    buttonLink = "/collections",
}) => {
    return (
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
                <i className="ri-shopping-bag-3-line text-5xl text-gray-400" />
            </div>

            <h2 className="text-2xl font-serif font-semibold text-charcoal mb-3">
                {title}
            </h2>

            <p className="text-medium-gray max-w-md mb-8">
                {description}
            </p>

            <Link
                to={buttonLink}
                className="bg-coral text-white px-8 py-3 rounded-xl font-medium hover:bg-coral/90 transition-all"
            >
                {buttonText}
            </Link>
        </div>
    );
};