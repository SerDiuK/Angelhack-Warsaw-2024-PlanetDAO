'use client';

import CommunitySwitcher from '@/app/components/CommunitySwitcher';
import EmptyState from '@/app/components/EmptyState';
import GoalCard from '@/app/components/GoalCard';
import Loader from '@/app/components/Loader';
import { MappedCommunity } from '@/app/model/mapped-community';
import { useCommunities } from '@/app/services/useCommunities';
import { useGoals } from '@/app/services/useGoals';
import { useWeb3 } from '@/app/services/useWeb3';
import { Avatar, Button, Tabs } from '@heathmont/moon-core-tw';
import { GenericDelete, GenericLogOut, GenericPlus, SportDarts } from '@heathmont/moon-icons-tw';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CreateGoalModal from '../CreateGoalModal';
import { MappedGoal } from '@/app/model/mapped-goal';
import JoinCommunityModal from '../JoinCommunityModal';
import MembersTable from '../MembersTable';
import { MappedMember } from '@/app/model/mapped-member';

export default function CommunityDetail() {
  const [community, setCommunity] = useState<MappedCommunity>();
  const [communityMembers, setCommunityMembers] = useState<MappedMember[]>([]);
  const [joinedCommunities, setJoinedCommunities] = useState<MappedCommunity[]>([]);
  const [goals, setGoals] = useState<MappedGoal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [showCreateGoalModal, setShowCreateGoalModal] = useState(false);
  const [showJoinCommunityModal, setShowJoinCommunityModal] = useState(false);

  const { fetchCommunity, leaveCommunity, deleteCommunity, fetchJoinedCommunities, fetchCommunityMembers } = useCommunities();
  const { fetchGoals } = useGoals();
  const { signer } = useWeb3();
  const { communityId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (communityId) {
      fetch(communityId as string);
    }
  }, [signer, communityId]);

  const fetch = async (communityId: string) => {
    const communityDetails = await fetchCommunity(communityId);
    setCommunity(communityDetails);

    setJoinedCommunities(await fetchJoinedCommunities());
    setGoals(await fetchGoals(communityId));
    setCommunityMembers(await fetchCommunityMembers(communityId));

    setIsLoading(false);
  };

  const leave = async () => {
    if (community) {
      setIsLeaving(true);

      await leaveCommunity(community?.address);

      setIsLeaving(false);
      setCommunity({ ...community, isMember: false });
    }
  };

  const closeJoinCommunityModal = async () => {
    setShowJoinCommunityModal(false);

    if (community) {
      setCommunity({ ...community, isMember: true });
    }
  };

  const terminate = async () => {
    if (community) {
      setIsDeleting(true);

      await deleteCommunity(community?.address);

      router.push('/communities');
    }
  };

  const closeCreateGoalModal = async (result?: { success: boolean }) => {
    setShowCreateGoalModal(false);

    if (result?.success && community) {
      setGoals(await fetchGoals(community.address));
    }
  };

  return (
    <>
      <div className={`flex items-center flex-col gap-8 w-full`}>
        {community && (
          <div className={`gap-8 flex flex-col w-full bg-gohan py-10 sm:pb-0 border-beerus border`}>
            <div className="container flex w-full justify-between relative">
              <div className="flex flex-col gap-1">
                <h5 className="font-semibold">Community</h5>
                <CommunitySwitcher currentCommunity={community} joinedCommunities={joinedCommunities} />
                <h3 className="flex gap-2 whitespace-nowrap">
                  <div className="flex">
                    Managed by &nbsp;
                    <a href={'/profile/' + community.owner?.address} className="flex items-center gap-2 text-piccolo">
                      <Avatar size="xs" className="rounded-full shrink-0" imageUrl={community.owner?.image} /> @{community.owner?.name}
                    </a>
                  </div>
                  <div>•</div>
                  <div>
                    <span className="text-hit font-semibold">{community.subscriptionPrice} AVAX</span> p/month
                  </div>
                </h3>
              </div>
              <div className="flex-col gap-2 hidden sm:flex">
                {(community.isOwner || community?.isMember) && (
                  <Button iconLeft={<GenericPlus />} onClick={() => setShowCreateGoalModal(true)}>
                    Create goal
                  </Button>
                )}

                {community.isMember && !community.isOwner && (
                  <Button onClick={leave} iconLeft={<GenericLogOut />} variant="secondary" animation={isLeaving ? 'progress' : false}>
                    Leave
                  </Button>
                )}
                {!community.isMember && !community.isOwner && (
                  <Button onClick={() => setShowJoinCommunityModal(true)} iconLeft={<GenericPlus />} variant="secondary" animation={isLeaving ? 'progress' : false}>
                    Join
                  </Button>
                )}
                {community.isOwner && (
                  <Button iconLeft={<GenericDelete />} className="bg-dodoria" onClick={terminate} animation={isDeleting ? 'progress' : false}>
                    Delete
                  </Button>
                )}
              </div>
            </div>
            <div className="container hidden sm:block">
              <Tabs selectedIndex={tabIndex} onChange={setTabIndex}>
                <Tabs.List>
                  <Tabs.Tab>About us</Tabs.Tab>
                  <Tabs.Tab>Goals ({goals.length})</Tabs.Tab>
                  <Tabs.Tab>Members ({community.membersCount})</Tabs.Tab>
                </Tabs.List>
              </Tabs>
            </div>
          </div>
        )}
        {tabIndex === 0 && (
          <div className="flex flex-col gap-6 w-full container items-center">
            {community && (
              <>
                <div className="h-[400px] w-full max-w-[600px] relative">
                  <Image unoptimized={true} layout="fill" objectFit="cover" src={community.image} onError={() => {}} alt="" />
                </div>
                <p>{community.description}</p>
              </>
            )}
          </div>
        )}
        {tabIndex === 1 && (
          <div className="flex flex-col gap-8 container items-center pb-10">
            <Loader element={goals.length > 0 ? goals.map((item, index) => <GoalCard item={item} key={index} />) : <EmptyState icon={<SportDarts className="text-moon-48" />} label="This community doesn’t have any goals yet." buttonLabel="Create goal" onButtonClick={() => setShowCreateGoalModal(true)} />} width={768} height={236} many={3} loading={isLoading} />{' '}
          </div>
        )}
        {tabIndex === 2 && (
          <div className="flex flex-col gap-8 container items-center pb-10">
            <MembersTable members={communityMembers} />
          </div>
        )}
      </div>

      {community && <CreateGoalModal open={showCreateGoalModal} onClose={closeCreateGoalModal} community={community} />}
      {community && <JoinCommunityModal open={showJoinCommunityModal} onClose={closeJoinCommunityModal} community={community} />}
    </>
  );
}
