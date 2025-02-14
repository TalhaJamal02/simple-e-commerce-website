import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { useCart } from "@/lib/CartContext";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

function FeaturedSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const parsedData = await response.json();
      setProducts(parsedData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const { wishlist, addToWishlist, removeFromWishlist } = useCart();

  const isInWishlist = (id: number) => wishlist.some((item) => item.id === id);

  const toggleWishlist = (products: Product) => {
    if (isInWishlist(products.id)) {
      removeFromWishlist(products.id);
    } else {
      addToWishlist({
        id: products.id,
        title: products.title,
        price: products.price,
        image: products.image,
        quantity: 1,
      });
    }
  };

  return (
    <div className="py-12 bg-background">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Featured Products
        </h2>
        <p className="text-lg text-muted-foreground">
          Check out our best-selling products
        </p>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg shadow-md h-full flex flex-col items-start justify-center"
            >
              <Skeleton className="h-48 w-full mb-6" />
              <div className="space-y-2 w-full">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="flex justify-between items-center w-full mt-4">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {products
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
            .map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="hover:-translate-y-1 transform transition-all duration-500"
              >
                <div
                  key={product.id}
                  className="bg-card p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-500 h-full flex flex-col items-start justify-center relative"
                >
                  <button
                    className="absolute top-4 right-4 text-muted-foreground hover:text-red-500 transition-colors duration-300"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product);
                    }}
                  >
                    {isInWishlist(product.id) ? (
                      <Heart className="h-6 w-6 fill-red-500 text-red-500" />
                    ) : (
                      <Heart className="h-6 w-6" />
                    )}
                  </button>
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="w-full h-48 object-contain mb-6 bg-blend-color-burn"
                  />
                  <h2 className="text-lg font-semibold my-2">
                    {product.title}
                  </h2>
                  <p className="text-muted-foreground mb-1">
                    {product.description.slice(0, 50)}...
                  </p>
                  <span className="flex items-center justify-between w-full">
                    <p className="text-lg font-bold text-foreground mb-1">
                      ${product.price}
                    </p>
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <p>{product.rating.rate}</p>
                      <p className="text-muted-foreground">({product.rating.count})</p>
                    </span>
                  </span>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

export default FeaturedSection;
