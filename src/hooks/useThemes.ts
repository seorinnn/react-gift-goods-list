import type { AxiosError } from 'axios';
import axios from 'axios';
import { useEffect, useState } from 'react';

import type { ThemeData } from '../types';

interface ThemesResponse {
  themes: ThemeData[];
}

interface ErrorResponse {
  message: string;
  statusCode?: number;
}

interface AxiosErrorResponse {
  message: string;
}

export const useThemes = () => {
  const [themes, setThemes] = useState<ThemeData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorResponse | null>(null);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get<ThemesResponse>(
          'https://react-gift-mock-api-seorinnn.vercel.app/api/v1/themes',
        );
        setThemes(response.data.themes);
        setIsLoading(false);
      } catch (err) {
        const axiosError = err as AxiosError<AxiosErrorResponse>;
        console.error('API 요청 실패:', axiosError);

        let errorMessage = '테마 목록을 가져오는데 실패했습니다.';
        const statusCode = axiosError.response?.status;

        if (statusCode === 400 || statusCode === 404) {
          errorMessage = '테마 목록을 찾을 수 없습니다.';
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
    fetchThemes();
  }, []);

  return { themes, isLoading, error };
};
