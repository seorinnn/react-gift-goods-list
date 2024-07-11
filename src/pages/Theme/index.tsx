import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { useThemes } from '@/hooks/useThemes';
import { RouterPath } from '@/routes/path';
import type { ThemeData } from '@/types';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const { themes, loading } = useThemes();
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);

  useEffect(() => {
    if (themes.length > 0) {
      const theme = themes.find((t) => t.key === themeKey);
      setCurrentTheme(theme || null);
    }
  }, [themeKey, themes]);

  // 로딩 중일 때 처리
  if (loading) {
    return <div>Loading...</div>;
  }

  // 테마 데이터가 없는 경우 404 페이지로 이동
  if (!currentTheme) {
    return <Navigate to={RouterPath.notFound} />;
  }

  return (
    <>
      <ThemeHeroSection theme={currentTheme} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
