import CommunityCard from '@/app/components/CommunityCard';
import { MappedCommunity } from '@/app/model/mapped-community';
import { Dispatch, SetStateAction, useState } from 'react';
import JoinCommunityModal from '../JoinCommunityModal';

export default function CommunityList({ communities, setCommunities }: { communities: MappedCommunity[]; setCommunities?: Dispatch<SetStateAction<MappedCommunity[]>> }) {
  const [selectedCommunity, setSelectedCommunity] = useState<MappedCommunity | null>(null);

  const closeJoinCommunityModal = (result?: { success: boolean }) => {
    if (result?.success && setCommunities) {
      setCommunities(communities.map((community) => (community.address === selectedCommunity?.address ? { ...community, isMember: true } : community)));
    }

    setSelectedCommunity(null);
  };

  return (
    <>
      <div className="container flex flex-col gap-8 items-center">
        {communities.map((community, index) => (
          <CommunityCard item={community} key={index} onJoin={() => setSelectedCommunity(community)} />
        ))}
      </div>
      {selectedCommunity && <JoinCommunityModal open={!!selectedCommunity} onClose={closeJoinCommunityModal} community={selectedCommunity} />}
    </>
  );
}
