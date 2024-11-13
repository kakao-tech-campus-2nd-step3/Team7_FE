import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { RequestPlaceReview } from '@/types';
import Header from '@/components/common/layouts/Header';
import RatingStep from '@/components/Review/steps/RatingStep';
import CommentStep from '@/components/Review/steps/CommentStep';
import { usePostPlaceReview } from '@/api/hooks/usePostPlaceReview';
import { useGetPlaceInfo } from '@/api/hooks/useGetPlaceInfo';

export default function ReviewPage() {
  const { id } = useParams() as { id: string };
  const { data: infoData } = useGetPlaceInfo(id);
  const { mutate: postReview } = usePostPlaceReview(id);

  const [reviewData, setReviewData] = useState<RequestPlaceReview>({
    likes: null,
    comments: '',
  });
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleRatingSubmit = (isLiked: boolean) => {
    setReviewData((prev) => ({ ...prev, likes: isLiked }));
    setCurrentStep(2);
  };

  const handleCommentSubmit = async (comment: string) => {
    const finalReviewData = {
      likes: reviewData.likes,
      comments: comment,
    };

    postReview(finalReviewData, {
      onSuccess: () => {
        console.log('리뷰가 성공적으로 등록되었습니다.');
      },
      onError: (error) => {
        console.error('리뷰 등록 중 오류가 발생했습니다:', error);
      },
    });
  };

  return (
    <Container>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <MainContent>
        {currentStep === 1 && <RatingStep onSubmit={handleRatingSubmit} placeInfo={infoData} />}
        {currentStep === 2 && (
          <CommentStep
            isLiked={reviewData.likes}
            onBack={() => setCurrentStep(1)}
            onSubmit={handleCommentSubmit}
            placeInfo={infoData}
          />
        )}
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1c1c1c;
  color: white;
  width: min(100%, 700px);
  margin: 0 auto;
`;

const HeaderWrapper = styled.div`
  margin: 0 1rem;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1.5rem;
  padding-bottom: 5rem;
`;
