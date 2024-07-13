import type { AxiosError } from 'axios';
import axios from 'axios';
import { useEffect, useState } from 'react';

import type { GoodsData, RankingFilterOption } from '@/types';

type UseGoodsListsResponse = {
  goodsList: GoodsData[];
  isLoading: boolean;
  error: ErrorResponse | null;
};

interface ErrorResponse {
  message: string;
  statusCode?: number;
}

interface AxiosErrorResponse {
  message: string;
}

export const useGoodsLists = (filterOption: RankingFilterOption): UseGoodsListsResponse => {
  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const fetchGoodsRanking = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          'https://react-gift-mock-api-seorinnn.vercel.app/api/v1/ranking/products',
          {
            params: {
              targetType: filterOption.targetType,
              rankType: filterOption.rankType,
            },
          },
        );
        setGoodsList(response.data.products);
        setIsLoading(false);
      } catch (err: unknown) {
        const axiosError = err as AxiosError<AxiosErrorResponse>;
        console.error('API 요청 실패:', axiosError);

        let errorMessage = '상품 목록을 가져오는데 실패했습니다.';
        const statusCode = axiosError.response?.status;

        if (statusCode === 400 || statusCode === 404) {
          errorMessage = '해당 옵션에 대한 상품을 찾을 수 없습니다.';
        } else if (statusCode === 500) {
          errorMessage = '서버에 오류가 발생했습니다.';
        }

        setError({
          message: errorMessage,
          statusCode: statusCode,
        });
        setIsLoading(false);
      }
    };

    fetchGoodsRanking();
  }, [filterOption]);

  return { goodsList, isLoading, error };
};
