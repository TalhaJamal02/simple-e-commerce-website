import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Star } from 'lucide-react';
import { BarLoader } from 'react-spinners';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  }
}

function FeaturedSection() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      const parsedData = await response.json();
      setProducts(parsedData);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="py-12 bg-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Featured Products</h2>
        <p className="text-lg text-gray-500">Check out our best-selling products</p>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col items-start justify-center">
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
          {products.slice(13, 17).map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className=' hover:-translate-y-1 transform transition-all duration-500'>
              <div
                key={product.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-500  h-full flex flex-col items-start justify-center"
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  width={500}
                  height={500}
                  className="w-full h-48 object-contain mb-6"
                />
                <h2 className="text-lg font-semibold my-2">{product.title}</h2>
                <p className="text-gray-600 mb-1">{product.description.slice(0, 50)}...</p>
                <span className="flex items-center justify-between w-full">
                  <p className="text-lg font-bold text-gray-800 mb-1">${product.price}</p>
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
  )
}

export default FeaturedSection
