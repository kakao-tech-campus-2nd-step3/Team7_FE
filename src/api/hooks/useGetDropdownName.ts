import { useQuery } from '@tanstack/react-query';
import { fetchInstance } from '../instance';

interface Influencer {
  influencerName: string;
}

const useGetDropdownName = () => {
  return useQuery({
    queryKey: ['influencers'],
    queryFn: async () => {
      const { data } = await fetchInstance.get<Influencer[]>('/influencers/names');
      return data.map((influencer) => ({
        label: influencer.influencerName,
        main: influencer.influencerName,
      }));
    },
  });
};

export default useGetDropdownName;
