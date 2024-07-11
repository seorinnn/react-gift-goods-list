import axios from 'axios';
import { useEffect, useState } from 'react';

import type { GoodsData, RankingFilterOption } from '@/types';

type UseGoodsRankingResponse = {
  goodsList: GoodsData[];
};

export const useGoodsRanking = (filterOption: RankingFilterOption): UseGoodsRankingResponse => {
  const [goodsList, setGoodsList] = useState<GoodsData[]>([]);

  useEffect(() => {
    const fetchGoodsRanking = async () => {
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
      } catch (err) {
        console.error('API 요청 실패:', err);
      }
    };

    fetchGoodsRanking();
  }, [filterOption]);

  return { goodsList };
};
