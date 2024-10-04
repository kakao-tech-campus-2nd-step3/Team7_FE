import styled from 'styled-components';

interface Props {
  likes: number;
  dislikes: number;
}

export default function BarGraph({ likes, dislikes }: Props) {
  const total = likes + dislikes;
  const likePercentage = total > 0 ? (likes / total) * 100 : 0;
  const dislikePercentage = total > 0 ? (dislikes / total) * 100 : 0;

  return (
    <GraphContainer>
      <Bar color="#FE7373" percentage={likePercentage}>
        <Label like>{likes}</Label>
      </Bar>
      <Bar color="#6f6cff" percentage={dislikePercentage}>
        <Label like={false}>{dislikes}</Label>
      </Bar>
    </GraphContainer>
  );
}

const GraphContainer = styled.div`
  display: flex;
  align-items: center;
  width: 900px;
  height: 48px;
  border-radius: 1000px;
  overflow: hidden;
  position: relative;
`;

const Bar = styled.div<{ color: string; percentage: number }>`
  height: 100%;
  background-color: ${(props) => props.color};
  width: ${(props) => props.percentage}%;
`;

const Label = styled.div<{ like: boolean }>`
  position: absolute;
  top: 0;
  ${(props) => (props.like ? 'left: 20px;' : 'right: 20px;')};
  line-height: 50px;
  font-size: 18px;
  color: white;
  font-weight: bold;
`;