'use client';

import { Button } from '@heathmont/moon-core-tw';
import CommunityList from '../features/CommunityList';
import { ControlsPlus } from '@heathmont/moon-icons-tw';
import CreateCommunityModal from '../features/CreateCommunityModal';
import { useEffect, useState } from 'react';
import { MappedCommunity } from '../model/mapped-community';
import { useCommunities } from '../services/useCommunities';
import { useWeb3 } from '../services/useWeb3';
import { useRouter } from 'next/navigation';

export default function CommunitiesPage() {
  const [openCreateCommunityModal, setOpenCreateCommunityModal] = useState(false);
  const [communities, setCommunities] = useState<MappedCommunity[]>([]);

  const { fetchJoinedCommunities } = useCommunities();
  const { signer } = useWeb3();
  const router = useRouter();

  const fetch = async () => {
    const joinedCommunities = await fetchJoinedCommunities();

    if (joinedCommunities.length === 0) {
      router.push('/communities');
    }

    setCommunities(joinedCommunities);
  };

  useEffect(() => {
    fetch();
  }, [signer]);

  const openCreateDaoModal = () => {
    setOpenCreateCommunityModal(true);
  };

  const onCloseCreateDaoModal = async (result?: { success: boolean }) => {
    setOpenCreateCommunityModal(false);

    if (result?.success) {
      await fetch();
    }
  };

  return (
    <>
      <main className={`flex items-center flex-col gap-8 pb-8`}>
        <div className={`gap-8 flex w-full bg-gohan pt-10 pb-6 border-beerus border`}>
          <div className="container flex w-full justify-between">
            <h1 className="text-moon-32 font-bold">Joined communities</h1>
            <Button iconLeft={<ControlsPlus />} onClick={openCreateDaoModal} className="pe-2 sm:pe-4">
              <span className="hidden sm:inline-block">Create community</span>
            </Button>
          </div>
        </div>
        <CommunityList communities={communities} />
        <CreateCommunityModal open={openCreateCommunityModal} onClose={onCloseCreateDaoModal} />
      </main>
    </>
  );
}
