'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Button } from '@heathmont/moon-core-tw';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      router.push('/joined');
    }
  }, [user]);

  return (
    <>
      <div className="bg-frieza-60 w-full pb-16 md:min-h-full-min-header flex flex-col items-center gap-8 px-4">
        <div className="flex flex-col gap-4 items-center text-gohan mt-16">
          <h2 className="font-bold text-moon-48">Create a fair and transparent community</h2>
          <h5>PlanetDAO enables you to create your decentralized autonomous organization platform (DAO) in just a few clicks.</h5>
        </div>
        <Link href="/api/auth/login">
          <Button className="shadow-moon-md">Get started</Button>
        </Link>
        <Image src="/images/home/community.png" height={500} width={900} alt="" />
      </div>
      <div className="bg-brief flex flex-col gap-20 text-gohan py-16 items-center">
        <div className="flex container flex-col-reverse items-center md:flex-row md:gap-16 md:items-start">
          <Image className="shrink-0" src="/images/home/coins.png" alt="" width={420} height={244} />
          <div className="flex flex-col gap-8 pt-10">
            <h3 className="text-moon-32 font-bold">Experience a lightning fast network with Avalanche</h3>
            <p>PlanetDAO works witht the lightning fast and scalable Avalanche blockchain that never lets your community down.</p>
          </div>
        </div>
      </div>
      <div className="bg-gohan flex flex-col gap-20 text-bulma py-16 items-center">
        <div className="flex container flex-col-reverse items-center md:flex-row md:gap-16 md:items-start">
          <div className="flex flex-col gap-8 pt-10">
            <h3 className="text-moon-32 font-bold">Raise funds for your community goals</h3>
            <p>Through AVAX subscriptions and donations you can raise funds for your community&aposs decentralized wallet.</p>
          </div>
          <Image className="shrink-0" src="/images/home/goal.png" alt="" width={420} height={360} />
        </div>
        <div className="flex container flex-col items-center md:flex-row md:gap-16 md:items-start">
          <Image className="shrink-0" src="/images/home/activity.png" alt="" width={360} height={336} />
          <div className="flex flex-col gap-8 pt-10">
            <h3 className="text-moon-32 font-bold">Make decisions together</h3>
            <p>Members of a community have voting power based on their role and their contribution. All members can vote on the ideas they believe will reach the community’s goals.</p>
          </div>
        </div>
      </div>
      <div className="bg-brief flex flex-col gap-20 text-gohan py-16 items-center">
        <div className="flex container flex-col-reverse items-center md:flex-row md:gap-16 md:items-start">
          <div className="flex flex-col gap-8 pt-10">
            <h3 className="text-moon-32 font-bold">Reward your community</h3>
            <p>The more active you are as a member in your community, the more badges you earn. The more badges you earn, the more voting power you have.</p>
          </div>
          <Image className="shrink-0" src="/images/home/rewards.png" alt="" width={420} height={336} />
        </div>
      </div>
    </>
  );
}
