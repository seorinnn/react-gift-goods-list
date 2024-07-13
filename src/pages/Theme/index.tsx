import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ThemeGoodsSection } from '@/components/features/Theme/ThemeGoodsSection';
import { ThemeHeroSection } from '@/components/features/Theme/ThemeHeroSection';
import { useThemes } from '@/hooks/useThemes';
//import { RouterPath } from '@/routes/path';
import type { ThemeData } from '@/types';

export const ThemePage = () => {
  const { themeKey = '' } = useParams<{ themeKey: string }>();
  const { themes, isLoading } = useThemes();
  const [currentTheme, setCurrentTheme] = useState<ThemeData | null>(null);

  useEffect(() => {
    if (themes.length > 0) {
      const theme = themes.find((t) => t.key === themeKey);
      setCurrentTheme(theme || null);
    }
  }, [themeKey, themes]);

  // 로딩 중일 때 처리
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // 테마 데이터가 없는 경우
  if (!currentTheme) {
    return <div>해당 테마를 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <ThemeHeroSection theme={currentTheme} />
      <ThemeGoodsSection themeKey={themeKey} />
    </>
  );
};
