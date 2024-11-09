import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import styled from 'styled-components';

import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import Footer from '@/components/common/layouts/Footer';
import Header from '@/components/common/layouts/Header';
import Loading from '@/components/common/layouts/Loading';
import Error from '@/components/common/layouts/Error';

export default function MainLayout() {
  return (
    <Wrapper>
      <Header />
      <InnerWrapper>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary FallbackComponent={Error} onReset={reset}>
              <Suspense fallback={<Loading size={50} />}>
                <Outlet />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </InnerWrapper>
      <Footer />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 960px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  width: 100%;
  margin-bottom: 40px;
`;
