"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { HashLoader } from "react-spinners";
import { Star } from "lucide-react";
import FeaturedSection from "@/components/FeaturedSection";
import { useCart } from "@/lib/CartContext";
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";


interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
  rating: {
    rate: number;
  };
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const parsedData = await response.json();
        setProduct(parsedData);
      };
      fetchData();
    }
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <HashLoader color="#1F2937" size={60} />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast(`Item Added To Cart!`);
  };

  return (
    <div className="bg-gray-50 p-8 rounded-lg shadow-lg h-full items-center justify-center my-6">
      <div className="text-center py-6">
        <h1 className="text-4xl font-bold text-gray-900 uppercase">Product Detail</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center my-10">
        <div className="flex justify-center">
          <Image
            src={product.image}
            width={300}
            height={300}
            alt={product.title}
            className="rounded-lg"
          />
        </div>

        <div className="text-center md:text-left">
          <p className="text-lg uppercase font-semibold text-gray-700 mb-2">
            {product.category}
          </p>
          <h2 className="text-3xl font-bold text-gray-800 my-3">{product.title}</h2>

          <p className="text-lg font-semibold text-gray-700 mb-2">
            Price: <span className="text-green-700">${product.price.toFixed(2)}</span>
          </p>

          <p className="text-base text-gray-600 mb-2 flex justify-center sm:justify-normal items-center gap-2">
            <span className="font-medium text-gray-700">Rating: </span>
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            {product.rating.rate}
          </p>

          <p className="flex text-gray-700 font-medium items-center gap-2 justify-center sm:justify-normal mb-2">
            Size: <ToggleGroup type="single" defaultValue="m">
              <ToggleGroupItem value="s" className=" border border-gray-300">S</ToggleGroupItem>
              <ToggleGroupItem value="m" className=" border border-gray-300">M</ToggleGroupItem>
              <ToggleGroupItem value="l" className=" border border-gray-300">L</ToggleGroupItem>
            </ToggleGroup>
          </p>

          <p className="text-base text-gray-600 mb-6">
            <span className="font-medium text-gray-700">Description: </span>{product.description}
          </p>

          <button
            className="w-full md:w-auto px-6 py-3 bg-gradient-to-br from-gray-600 via-gray-700 to-black text-white text-sm font-bold uppercase rounded-md hover:-translate-y-1 transition-all duration-300"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="mt-24">
        <FeaturedSection />
      </div>
    </div>
  );
};

export default ProductDetailPage;
