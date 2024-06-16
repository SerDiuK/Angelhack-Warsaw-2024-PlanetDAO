'use client';

import EmptyState from '@/app/components/EmptyState';
import Loader from '@/app/components/Loader';
import { MappedGoal } from '@/app/model/mapped-goal';
import { useGoals } from '@/app/services/useGoals';
import { useWeb3 } from '@/app/services/useWeb3';
import { Avatar, Button, Tabs } from '@heathmont/moon-core-tw';
import { ControlsPlus, SportDarts } from '@heathmont/moon-icons-tw';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useIdeas } from '@/app/services/useIdeas';
import Link from 'next/link';
import IdeaCard from '@/app/components/IdeaCard';
import CreateIdeaModal from '../CreateIdeaModal';
import { MappedIdea } from '@/app/model/mapped-idea';
import { useCommunities } from '@/app/services/useCommunities';
import { MappedCommunity } from '@/app/model/mapped-community';
import DonateCoinModal from '../DonateCoinModal';
import { toast } from 'react-toastify';

export default function GoalDetail() {
  const [community, setCommunity] = useState<MappedCommunity>();
  const [goal, setGoal] = useState<MappedGoal>();
  const [ideas, setIdeas] = useState<MappedIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<MappedIdea | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [showCreateIdeaModal, setShowCreateIdeaModal] = useState(false);

  const { fetchCommunity } = useCommunities();
  const { fetchGoal, deleteGoal } = useGoals();
  const { fetchIdeas, vote, donate } = useIdeas();

  const { signer } = useWeb3();
  const { goalId, communityId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (goalId) {
      fetch(goalId as string, communityId as string);
    }
  }, [signer, goalId]);

  const fetch = async (goalId: string, communityId: string) => {
    setCommunity(await fetchCommunity(communityId));
    setGoal(await fetchGoal(goalId));
    setIdeas(await fetchIdeas(goalId));

    setIsLoading(false);
  };

  const terminate = async () => {
    if (goal) {
      setIsDeleting(true);

      await deleteGoal(goal?.address);

      router.push('/goals');
    }
  };

  const closeIdeaModal = async (result?: { success: boolean }) => {
    setShowCreateIdeaModal(false);

    if (result?.success && goal) {
      setIdeas(await fetchIdeas(goal.address));
    }
  };

  const onClickDonate = (idea: MappedIdea) => {
    setSelectedIdea(idea);
  };

  const closeDonateModal = (result?: { success: boolean; value: number }) => {
    if (result?.success && selectedIdea) {
      setIdeas(ideas.map((id) => (id.address === selectedIdea?.address ? { ...id, donationsReceived: id.donationsReceived + result.value } : id)));
    }

    setSelectedIdea(null);
  };

  const voteIdea = async (idea: MappedIdea) => {
    if (idea) {
      const toastId = toast('Voting ...', { autoClose: false, isLoading: true, type: 'info' });

      setIsVoting(true);

      await vote(idea?.address);

      setIsVoting(false);
      toast.update(toastId, { type: 'success', render: 'Vote successful!', autoClose: 1000, isLoading: false });

      setIdeas(ideas.map((id) => (id.address === idea.address ? { ...id, isVoter: true } : idea)));
    }
  };

  return (
    <>
      <div className={`flex items-center flex-col gap-8 w-full`}>
        {goal && (
          <div className="gap-8 flex flex-col w-full bg-gohan py-10 sm:pb-0 border-beerus border">
            <div className="container flex w-full justify-between">
              <div className="flex flex-col gap-1 overflow-hidden">
                <Loader
                  loading={isLoading}
                  width={300}
                  element={
                    <h5 className="font-semibold">
                      <Link className="text-piccolo" href={`..`}>
                        {community?.name}
                      </Link>{' '}
                      &gt; Goals
                    </h5>
                  }
                />
                <Loader loading={isLoading} width={300} element={<h1 className="text-moon-32 font-bold">{goal.name}</h1>} />
                <Loader
                  loading={isLoading}
                  width={770}
                  element={
                    <h3 className="flex gap-2 whitespace-nowrap flex-col sm:flex-row">
                      <div>
                        <span className="text-hit font-semibold">AVAX {goal.reached}</span> of AVAX {goal.target}
                      </div>
                      <div className="hidden sm:block">•</div>
                      <div>{ideas.length} ideas</div>
                      <div className="hidden sm:block">•</div>
                      <div className="flex">
                        Managed by &nbsp;
                        <a href={'/profile/' + goal.owner?.address} className="flex items-center gap-2 text-piccolo">
                          <Avatar size="xs" className="rounded-full shrink-0" imageUrl={goal.owner?.image} /> @{goal.owner?.name}
                        </a>
                      </div>
                    </h3>
                  }
                />
              </div>
              <div className="flex-col gap-2 hidden sm:flex">
                {goal.isOwner || community?.isMember ? (
                  <>
                    {' '}
                    <Button iconLeft={<ControlsPlus />} onClick={() => setShowCreateIdeaModal(true)}>
                      Create idea
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="container hidden sm:block">
              <Tabs selectedIndex={tabIndex} onChange={setTabIndex}>
                <Tabs.List>
                  <Tabs.Tab>Description</Tabs.Tab>
                  <Tabs.Tab>Ideas ({ideas.length})</Tabs.Tab>
                </Tabs.List>
              </Tabs>
            </div>
          </div>
        )}
        {tabIndex === 0 && (
          <div className="flex flex-col gap-6 w-full container items-center">
            {goal && (
              <>
                <div className="h-[400px] w-full max-w-[600px] relative">
                  <Image unoptimized={true} layout="fill" objectFit="cover" src={goal.image} onError={() => {}} alt="" />
                </div>
                <p>{goal.description}</p>
              </>
            )}
          </div>
        )}
        {tabIndex === 1 && (
          <div className="flex flex-col gap-8 container items-center pb-10">
            <Loader
              element={ideas.length > 0 ? ideas.map((idea, index) => <IdeaCard item={idea} key={index} onClickDonate={onClickDonate} onClickVote={voteIdea} />) : <EmptyState icon={<SportDarts className="text-moon-48" />} label="This goal doesn’t have any goals yet." buttonLabel="Create idea" onButtonClick={() => setShowCreateIdeaModal(true)} />}
              width={768}
              height={236}
              many={3}
              loading={isLoading}
            />{' '}
          </div>
        )}
      </div>

      {goal && <CreateIdeaModal open={showCreateIdeaModal} onClose={closeIdeaModal} goal={goal} />}
      {selectedIdea && <DonateCoinModal idea={selectedIdea} show={!!selectedIdea} onClose={closeDonateModal} />}
    </>
  );
}
