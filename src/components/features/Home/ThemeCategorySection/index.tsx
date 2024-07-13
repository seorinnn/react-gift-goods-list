import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { useThemes } from '@/hooks/useThemes';
import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

import { ThemeCategoryItem } from './ThemeCategoryItem';

export const ThemeCategorySection = () => {
  const { themes, isLoading, error } = useThemes();
  console.log('Themes:', themes);

  //로딩중인 경우
  if (isLoading)
    return (
      <LoadingWrapper>
        <ClipLoader size={60} color={'#bdbdbd'} loading={isLoading} />
      </LoadingWrapper>
    );

  //에러가 났을 경우
  if (error)
    return (
      <ErrorWrapper>
        <p>{error.message}</p>
      </ErrorWrapper>
    );

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 4,
            md: 6,
          }}
        >
          {' '}
          {themes.map((theme) => (
            <Link to={getDynamicPath.theme(theme.key)} key={theme.id}>
              <ThemeCategoryItem image={theme.imageURL} label={theme.label} />
            </Link>
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 14px 14px 3px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 45px 52px 23px;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 15vh;
  text-align: center;
`;
