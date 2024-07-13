import styled from '@emotion/styled';
import { ClipLoader } from 'react-spinners';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { useProducts } from '@/hooks/useProducts';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { products, isLoading, error } = useProducts(themeKey);

  //로딩중인 경우
  if (isLoading) {
    return (
      <LoadingWrapper>
        <ClipLoader size={60} color={'#bdbdbd'} loading={isLoading} />
      </LoadingWrapper>
    );
  }

  //에러가 났을 경우
  if (error) {
    return (
      <ErrorWrapper>
        <p>{error.message}</p>
      </ErrorWrapper>
    );
  }

  //상품 데이터가 없을 경우
  if (products.length === 0) {
    return (
      <NoProductsWrapper>
        <p>상품이 없어요.</p>
      </NoProductsWrapper>
    );
  }
  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {products.map(({ id, imageURL, name, price, brandInfo }) => (
            <DefaultGoodsItems
              key={id}
              imageSrc={imageURL}
              title={name}
              amount={price.sellingPrice}
              subtitle={brandInfo.name}
            />
          ))}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
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

const NoProductsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15vh;
  font-size: 16px;
  font-weight: bold;
`;
