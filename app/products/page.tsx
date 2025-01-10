"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import { Heart, Star } from "lucide-react";
import { HashLoader } from "react-spinners";
import Image from "next/image";
import Link from "next/link";

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

function Products() {
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
      });
    }
  };

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

  return (
    <div className=" h-full py-16 px-4 bg-gray-100">
      <div className="my-10">
        <h1 className="text-4xl font-extrabold text-center mb-2 text-gray-900">
          Our Exclusive Products
        </h1>
        <p className="text-lg text-center text-gray-600 mb-8">
          Discover the best products curated just for you
        </p>
      </div>
      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <HashLoader color="#1F2937" loading={loading} size={60} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="hover:-translate-y-1 transform transition-all duration-500"
            >
              <div
                key={product.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-500 h-full flex flex-col items-start justify-center relative"
              >
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors duration-300"
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
                  className="w-full h-48 object-contain mb-6"
                />
                <h2 className="text-lg font-semibold my-2">{product.title}</h2>
                <p className="text-gray-600 mb-1">
                  {product.description.slice(0, 50)}...
                </p>
                <span className="flex items-center justify-between w-full">
                  <p className="text-lg font-bold text-gray-800 mb-1">
                    ${product.price}
                  </p>
                  <span className="flex items-center gap-2 text-gray-600">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <p>{product.rating.rate}</p>
                    <p className="text-gray-400">({product.rating.count})</p>
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

export default Products;
