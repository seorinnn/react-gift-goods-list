import styled from '@emotion/styled';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

import { Container } from '@/components/common/layouts/Container';
import { useGoodsLists } from '@/hooks/useGoodsLists';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

import { GoodsRankingFilter } from './Filter';
import { GoodsRankingList } from './List';

export const GoodsRankingSection = () => {
  const [filterOption, setFilterOption] = useState<RankingFilterOption>({
    targetType: 'ALL',
    rankType: 'MANY_WISH',
  });

  const { goodsList, isLoading, error } = useGoodsLists(filterOption);

  return (
    <Wrapper>
      <Container>
        <Title>실시간 급상승 선물랭킹</Title>
        <GoodsRankingFilter filterOption={filterOption} onFilterOptionChange={setFilterOption} />
        {isLoading ? (
          <LoadingWrapper>
            <ClipLoader size={60} color={'#bdbdbd'} loading={isLoading} />
          </LoadingWrapper>
        ) : error ? (
          <ErrorWrapper>
            <p>{error.message}</p>
          </ErrorWrapper>
        ) : goodsList.length === 0 ? (
          <NoProductsWrapper>
            <p>보여줄 상품이 없어요!</p>
          </NoProductsWrapper>
        ) : (
          <GoodsRankingList goodsList={goodsList} />
        )}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 0 16px 32px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 0 16px 80px;
  }
`;

const Title = styled.h2`
  color: #000;
  width: 100%;
  text-align: left;
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;

  @media screen and (min-width: ${breakpoints.sm}) {
    text-align: center;
    font-size: 35px;
    line-height: 50px;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
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
