import axios from 'axios';
import { useEffect, useState } from 'react';

import type { ThemeData } from '../types';

interface ThemesResponse {
  themes: ThemeData[];
}

export const useThemes = () => {
  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get<ThemesResponse>(
          'https://react-gift-mock-api-seorinnn.vercel.app/api/v1/themes',
        );
        setThemes(response.data.themes);
        setLoading(false);
      } catch (err) {
        console.error('API 요청 실패:', err);
        setError('테마를 가져오는데 실패했습니다.');
        setLoading(false);
      }
    };
    fetchThemes();
  }, []);

  return { themes, loading, error };
};
