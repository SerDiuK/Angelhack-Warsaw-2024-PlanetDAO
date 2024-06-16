'use client';

import Loader from '@/app/components/Loader';
import { MappedIdea } from '@/app/model/mapped-idea';
import { useIdeas } from '@/app/services/useIdeas';
import { useWeb3 } from '@/app/services/useWeb3';
import { Avatar, Button } from '@heathmont/moon-core-tw';
import { GenericHeart, ShopWallet } from '@heathmont/moon-icons-tw';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DonateCoinModal from '../DonateCoinModal';
import { useCommunities } from '@/app/services/useCommunities';
import { useGoals } from '@/app/services/useGoals';
import { MappedCommunity } from '@/app/model/mapped-community';
import { MappedGoal } from '@/app/model/mapped-goal';
import Link from 'next/link';
import { toast } from 'react-toastify';

export default function IdeaDetail() {
  const [community, setCommunity] = useState<MappedCommunity>();
  const [goal, setGoal] = useState<MappedGoal>();
  const [idea, setIdea] = useState<MappedIdea>();
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);

  const { fetchCommunity } = useCommunities();
  const { fetchGoal } = useGoals();
  const { fetchIdea, vote, unVote } = useIdeas();

  const { signer } = useWeb3();
  const { ideaId, goalId, communityId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (ideaId && goalId && communityId) {
      fetch(ideaId as string, goalId as string, communityId as string);
    }
  }, [signer, ideaId]);

  const fetch = async (ideaId: string, goalId: string, communityId: string) => {
    setCommunity(await fetchCommunity(communityId));
    setGoal(await fetchGoal(goalId));
    setIdea(await fetchIdea(ideaId));

    setIsLoading(false);
  };

  const onClickDonate = () => {
    setShowDonateModal(true);
  };

  const closeDonateModal = (result?: { success: boolean; value: number }) => {
    setShowDonateModal(false);

    if (result?.success && idea) {
      setIdea({ ...idea, donationsReceived: idea.donationsReceived + result.value } as MappedIdea);
    }
  };

  const terminate = async () => {
    if (idea) {
      setIsDeleting(true);

      // await deleteIdea(idea?.address);

      router.push('/ideas');
    }
  };

  const voteIdea = async () => {
    if (idea) {
      const toastId = toast('Voting ...', { autoClose: false, isLoading: true, type: 'info' });

      setIsVoting(true);

      await vote(idea?.address);

      setIsVoting(false);
      toast.update(toastId, { type: 'success', render: 'Vote successful!', autoClose: 1000, isLoading: false });

      setIdea({ ...idea, isVoter: true });
    }
  };

  const unVoteIdea = async () => {
    if (idea) {
      const toastId = toast('Removing vote ...', { autoClose: false, isLoading: true, type: 'info' });

      setIsVoting(true);

      await unVote(idea?.address);

      setIsVoting(false);
      toast.update(toastId, { type: 'success', render: 'Vote removed!', autoClose: 1000, isLoading: false });

      setIdea({ ...idea, isVoter: false });
    }
  };

  return (
    <>
      <div className="flex items-center flex-col gap-8 w-full">
        <div className="gap-8 flex flex-col w-full bg-gohan py-10 border-beerus border">
          <div className="container flex w-full justify-between relative">
            <div className="flex flex-col gap-1">
              <Loader
                loading={isLoading}
                width={300}
                element={
                  <h5 className="font-semibold">
                    <Link href={`../../../../${communityId}`} className="text-piccolo">
                      {community?.name}
                    </Link>{' '}
                    &gt;{' '}
                    <Link className="text-piccolo" href={`../../../../${communityId}/goal/${goalId}`}>
                      {goal?.name}
                    </Link>{' '}
                    &gt; {idea?.name}
                  </h5>
                }
              />
              <Loader loading={isLoading} width={300} element={<h1 className="text-moon-32 font-bold">{idea?.name}</h1>} />
              <Loader
                loading={isLoading}
                width={770}
                element={
                  <h3 className="flex gap-2 whitespace-nowrap">
                    <div>
                      Donated <span className="text-hit font-semibold">AVAX {idea?.donationsReceived}</span>
                    </div>
                    <div className="hidden sm:block">•</div>
                    <div>
                      <span className="text-hit font-semibold">{idea?.votesCount}</span> votes
                    </div>
                    <div className="hidden sm:block">•</div>
                    <div className="flex">
                      Created by &nbsp;
                      <a href={'/profile/' + idea?.owner?.address} className="flex items-center gap-2 text-piccolo">
                        <Avatar size="xs" className="rounded-full shrink-0" imageUrl={idea?.owner?.image} /> @{idea?.owner?.name}
                      </a>
                    </div>
                  </h3>
                }
              />
            </div>
            <div className="flex-col gap-2 hidden sm:flex">
              <Button iconLeft={<ShopWallet />} onClick={onClickDonate}>
                Donate
              </Button>
              {!idea?.isOwner &&
                community?.isMember &&
                (idea?.isVoter ? (
                  <Button iconLeft={<GenericHeart fill="red" color="red" />} variant="secondary" disabled={isVoting} onClick={unVoteIdea}>
                    Voted
                  </Button>
                ) : (
                  <Button iconLeft={<GenericHeart />} variant="secondary" animation={isVoting ? 'progress' : false} disabled={isVoting} onClick={voteIdea}>
                    Vote
                  </Button>
                ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full container items-center">
          {idea && (
            <>
              <div className="h-[400px] w-full max-w-[600px] relative">
                <Image unoptimized={true} layout="fill" objectFit="cover" src={idea.image} onError={() => {}} alt="" />
              </div>
              <p>{idea.description}</p>
            </>
          )}
        </div>
      </div>

      {idea && <DonateCoinModal idea={idea} show={showDonateModal} onClose={closeDonateModal} />}
    </>
  );
}
