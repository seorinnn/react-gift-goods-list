import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  imageURL: string;
  name: string;
  price: {
    sellingPrice: number;
  };
  brandInfo: {
    name: string;
  };
}

interface ProductsResponse {
  products: Product[];
  nextPageToken?: string;
}

interface ErrorResponse {
  message: string;
  statusCode?: number;
}

interface AxiosErrorResponse {
  message: string;
}

export const useProducts = (themeKey: string, maxResults: number = 20) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<ProductsResponse>(
          `https://react-gift-mock-api-seorinnn.vercel.app/api/v1/themes/${themeKey}/products`,
          {
            params: {
              maxResults,
            },
          },
        );
        setProducts(response.data.products);
        setIsLoading(false);
      } catch (err: unknown) {
        const axiosError = err as AxiosError<AxiosErrorResponse>;
        console.error('API 요청 실패:', axiosError);
        setError({
          message: axiosError.response?.data?.message || '상품 목록을 가져오는데 실패했습니다.',
          statusCode: axiosError.response?.status,
        });
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [themeKey, maxResults]);

  return { products, isLoading, error };
};
