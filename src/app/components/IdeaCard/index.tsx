import Image from 'next/legacy/image';
import Card from '../Card';
import Link from 'next/link';
import { Button } from '@heathmont/moon-core-tw';
import { ArrowsRightShort, GenericHeart, GenericIdea, ShopWallet } from '@heathmont/moon-icons-tw';
import { useState } from 'react';
import { MappedIdea } from '@/app/model/mapped-idea';

const IdeaCard = ({ item, onClickVote, onClickDonate, className }: { item: MappedIdea; onClickVote?: (idea: MappedIdea) => void; onClickDonate?: (idea: MappedIdea) => void; hideGoToButton?: boolean; className?: string }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  return (
    <Card className={`max-w-[720px] ${className}`}>
      <div className="flex w-full">
        <div className="rounded-moon-s-md overflow-hidden flex justify-center items-center border border-beerus" style={{ position: 'relative', width: '188px', minWidth: '188px', height: '188px' }}>
          {<Image unoptimized={true} layout="fill" objectFit="cover" src={item.image} onError={() => setShowPlaceholder(true)} alt="" />}
          {showPlaceholder && <GenericIdea className="text-moon-48 text-trunks" />}
        </div>
        <div className="flex flex-1 flex-col gap-2 relative px-5 text-moon-16">
          <p className="font-semibold text-moon-18">{item.name}</p>
          <div>
            <p className="font-semibold text-moon-20 text-hit">AVAX {Number(item.donationsReceived)}</p>
            <p>in donations</p>
          </div>
          <div className="absolute bottom-0 right-0 flex gap-2">
            {!item.isOwner && !item.isVoter && (
              <Button variant="secondary" iconLeft={<GenericHeart />} onClick={onClickVote && (() => onClickVote(item))}>
                Vote
              </Button>
            )}
            <Button variant="secondary" iconLeft={<ShopWallet />} onClick={onClickDonate && (() => onClickDonate(item))}>
              Donate
            </Button>
            <Link href={`${location.pathname}/idea/${item.address}`}>
              <Button iconLeft={<ArrowsRightShort />}>Go to idea</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IdeaCard;
