import axios from 'axios';
import { useEffect, useState } from 'react';

import type { ThemeData } from '../types';

interface ThemesResponse {
  themes: ThemeData[];
}

export const useThemes = () => {
  const [themes, setThemes] = useState<ThemeData[]>([]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get<ThemesResponse>(
          'https://react-gift-mock-api-seorinnn.vercel.app/api/v1/themes',
        );
        setThemes(response.data.themes);
      } catch (err) {
        console.error('API 요청 실패:', err);
      }
    };

    fetchThemes();
  }, []);

  return { themes };
};
