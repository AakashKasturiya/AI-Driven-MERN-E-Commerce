import { useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { ProductPoster } from "../../components/pages/productDetailsPage/Productposter";
import { Reviews } from "../../components/pages/productDetailsPage/Reviews";
import { ProductDetail } from "../../components/pages/productDetailsPage/ProductDetail";

export const ProductDetailsPage = () => {

   /** Get the product id from the url */
   const {id} = useParams();
  
   const {product, loading, error} = useProduct(id);
  

   if (loading) {
     return (
       <main className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-24">
         Loading...
       </main>
     );
   }

   if (error) {
     return (
       <main className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-24">
         Error: {error.message}
       </main>
     );
   }

   if (!product) {
     return (
       <main className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-24">
         Product not found.
       </main>
     );
   }

  return (
    <>
      <main className="px-6 md:px-12 lg:px-16 max-w-7xl mx-auto py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
         <ProductPoster product={product}/>

         <ProductDetail product={product}/>
        </div>

       {/** Reviews Component */}
       <Reviews product={product} />
      </main>
    </>
  );
};
