import Image from 'next/legacy/image';
import Card from '../Card';
import { ArrowsRightShort, GenericPlus, SportDarts } from '@heathmont/moon-icons-tw';
import { MouseEventHandler, useState } from 'react';
import Link from 'next/link';
import { Avatar, Button } from '@heathmont/moon-core-tw';
import { MappedCommunity } from '@/app/model/mapped-community';

const CommunityCard = ({ item, className = '', onJoin }: { item: MappedCommunity; className?: string; onJoin?: MouseEventHandler }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  return (
    <Card className={`max-w-[720px] flex flex-col gap-4 relative ${className}`}>
      <div className="flex w-full">
        <div className="rounded-moon-s-md overflow-hidden flex justify-center items-center border border-beerus relative w-[80px] h-[80px] sm:w-[180px] sm:h-[180px]">
          {<Image unoptimized={true} layout="fill" objectFit="cover" src={item.image} onError={() => setShowPlaceholder(true)} alt="" />}
          {showPlaceholder && <SportDarts className="text-moon-48 text-trunks" />}
        </div>
        <div className="flex flex-1 flex-col gap-2 relative px-5 text-moon-16">
          <p className="font-semibold text-moon-18">{item.name}</p>
          <p>Subscription of AVAX {item.subscriptionPrice} p/month</p>
          <div className="hidden sm:flex">
            Managed by &nbsp;
            <Link href={'/profile/' + item.owner?.address} className="flex items-center gap-2 text-piccolo">
              <Avatar size="xs" className="rounded-full shrink-0" imageUrl={item.owner?.image} /> @{item.owner?.name}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex gap-2 relative sm:absolute sm:bottom-6 sm:right-6">
        {!item.isOwner && !item.isMember && (
          <Button className="w-full sm:w-auto flex-1" variant="secondary" iconLeft={<GenericPlus />} onClick={onJoin}>
            Join
          </Button>
        )}
        <Link className="w-full sm:w-auto flex-1" href={`communities/${item.address}`}>
          <Button className="w-full" iconLeft={<ArrowsRightShort />}>
            Go to community
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default CommunityCard;
