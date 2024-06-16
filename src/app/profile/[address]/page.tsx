'use client';

import { useEffect, useState } from 'react';

import { Avatar, Button, IconButton, Tabs } from '@heathmont/moon-core-tw';
import { ControlsExpandAlt, FilesGeneric, SoftwareLogOut } from '@heathmont/moon-icons-tw';

import { useParams, useRouter } from 'next/navigation';
import BadgesPanel from '../../features/BadgesPanel';
import { useWeb3 } from '@/app/services/useWeb3';
import { MappedUser } from '@/app/model/mapped-user';
import { useUserRegistry } from '@/app/services/useUserRegistry';

export default function Profile() {
  const [user, setUser] = useState<MappedUser | null>(null);
  const [badges, setBadges] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);

  const router = useRouter();
  const { address } = useParams();
  const { account } = useWeb3();
  const { getUser, getBadges } = useUserRegistry();

  const fetchUser = async () => {
    setUser(await getUser(address as string));
    setBadges(await getBadges(address as string));
  };

  const editUser = async () => {};

  useEffect(() => {
    fetchUser();
  }, [address, account]);

  function goToFaucet() {
    window.open('https://faucet.moonbeam.network/', '_ blank');
  }

  function logout() {
    router.push('/api/auth/logout');
  }

  return (
    <>
      <div className={`gap-8 flex flex-col w-full bg-gohan pt-10 border-beerus border`}>
        <div className="container flex w-full justify-between relative">
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Avatar className="rounded-full border border-beerus bg-gohan text-moon-80 h-20 w-20" imageUrl={user?.image} />
              {address === account && <IconButton className="absolute right-0 bottom-0 rounded-moon-i-sm" size="xs" icon={<FilesGeneric className="text-gohan" color="#ffff" />} onClick={editUser}></IconButton>}
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-moon-32 text-piccolo">{user?.name}</h1>
              <h3 className="text-trunks">{address}</h3>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {address === account && (
              <Button iconLeft={<ControlsExpandAlt />} onClick={goToFaucet}>
                Add coin
              </Button>
            )}

            {address === account && (
              <Button variant="secondary" iconLeft={<SoftwareLogOut />} onClick={logout}>
                Log out
              </Button>
            )}
          </div>
        </div>
        <div className="container">
          <Tabs selectedIndex={tabIndex} onChange={setTabIndex}>
            <Tabs.List>
              <Tabs.Tab>Badges</Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </div>
      </div>
      <div className="container py-10">{tabIndex === 0 && <BadgesPanel badges={badges} />}</div>
    </>
  );
}
