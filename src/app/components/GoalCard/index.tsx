import Image from 'next/legacy/image';
import Card from '../Card';
import { Button } from '@heathmont/moon-core-tw';
import Link from 'next/link';
import { ArrowsRightShort, SportDarts } from '@heathmont/moon-icons-tw';
import { useState } from 'react';
import { MappedGoal } from '@/app/model/mapped-goal';

const GoalCard = ({ item, className = '' }: { item: MappedGoal; className?: string }) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  return (
    <Card className={`${className} max-w-[720px] flex flex-col gap-4 relative`}>
      <div className="flex w-full">
        <div className="rounded-moon-s-md overflow-hidden flex justify-center items-center border border-beerus relative w-[80px] h-[80px] sm:w-[180px] sm:h-[180px]">
          {<Image unoptimized={true} layout="fill" objectFit="cover" src={item.image} onError={() => setShowPlaceholder(true)} alt="" />}
          {showPlaceholder && <SportDarts className="text-moon-48 text-trunks" />}
        </div>
        <div className="flex flex-1 flex-col gap-2 sm:relative px-5 text-moon-16">
          <p className="font-semibold text-moon-18">{item.name}</p>
          <div className="flex flex-col gap-2">
            <div className="flex gap-4">
              <p>
                <span className="text-hit">AVAX {item.reached} </span>reached of AVAX {item.target} goal
              </p>
            </div>
            <div className="relative w-[260px] bg-goku border-beerus rounded-full h-[14px] overflow">
              <div className={`bg-hit h-[14px] rounded-full absolute left-0`} style={{ width: (item.reached / item.target) * 260 }}></div>
            </div>
          </div>
          <div className="hidden sm:inline-block">
            <p className="font-semibold text-moon-20 text-hit">{item.ideasNumber}</p>
            <p>Ideas</p>
          </div>
        </div>
      </div>
      <Link href={`${location.pathname}/goal/${item.address}`}>
        <Button className="sm:absolute sm:bottom-6 sm:right-6 w-full sm:w-auto" iconLeft={<ArrowsRightShort />}>
          Go to goal
        </Button>
      </Link>
    </Card>
  );
};

export default GoalCard;
