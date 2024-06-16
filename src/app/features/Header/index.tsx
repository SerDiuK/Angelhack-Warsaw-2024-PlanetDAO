'use client';

import NavItem from '@/app/components/NavItem';
import { useWeb3 } from '@/app/services/useWeb3';
import { useUser } from '@auth0/nextjs-auth0/client';
import { Avatar, Button, Dropdown, MenuItem } from '@heathmont/moon-core-tw';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CreateCommunityModal from '../CreateCommunityModal';
import { useUserRegistry } from '@/app/services/useUserRegistry';
import { MappedUser } from '@/app/model/mapped-user';

export const Header = () => {
  const [openCreateCommunityModal, setOpenCreateCommunityModal] = useState(false);
  const [mappedUser, setUser] = useState<MappedUser | null>(null);

  const { isLoading, user } = useUser();
  const { account, connectMetamask, balance } = useWeb3();
  const { getUser } = useUserRegistry();
  const pathName = usePathname();
  const router = useRouter();

  const connect = async () => {
    await connectMetamask();
  };

  const connectUser = async () => {
    setUser(await getUser(account as string));
  };

  const closeCreateCommunityModal = (result?: { success: boolean }) => {
    setOpenCreateCommunityModal(false);

    if (result?.success) {
      router.push('/joined');
    }
  };

  useEffect(() => {
    if (!account && !isLoading) {
      connect();
    }
  }, [user]);

  useEffect(() => {
    if (balance) {
      connectUser();
    }
  }, [balance]);

  return (
    <>
      <header className={`w-full px-8 py-4 gap-4 flex justify-between items-center z-1 bg-gradient-header`}>
        <div className="flex items-center gap-4">
          <Link href={user ? '/joined' : '/'}>
            <div style={{ minWidth: '119px' }}>
              <Image height={48} width={119} src="/images/logo.svg" alt="PlanetDAO" />
            </div>
          </Link>
          <span className="hidden sm:inline-flex">
            <NavItem highlight={pathName.includes('/joined')} link="/joined" label="Joined Communities" />
            <NavItem highlight={pathName.includes('/communities')} link="/communities" label="All Communities" />
            <NavItem label="Create Your Community" onClick={() => setOpenCreateCommunityModal(true)} />
          </span>
        </div>
        {user ? (
          <div className="wallet__wrapper gap-4 flex items-center">
            <div className="wallet__info flex flex-col items-end">
              <Link href={'/profile/'} rel="noreferrer" className="text-primary max-w-[250px]">
                <div className="font-medium text-whis truncate">{mappedUser?.name}</div>
              </Link>
              {account ? <div className="text-goten font-semibold truncate">{balance} AVAX</div> : <div onClick={connect}>Connect wallet</div>}
            </div>
            <Dropdown value={null} onChange={() => {}}>
              <Dropdown.Trigger>
                <Avatar imageUrl={mappedUser?.image} size="lg" className="rounded-full border-2 border-piccolo" />
              </Dropdown.Trigger>

              <Dropdown.Options className="bg-gohan w-48 min-w-0">
                <Dropdown.Option>
                  <Link href={`/profile/${account}`} passHref>
                    <MenuItem>Go to my profile</MenuItem>
                  </Link>
                </Dropdown.Option>
                <Dropdown.Option>
                  <Link href="api/auth/logout">
                    <MenuItem>Log out</MenuItem>
                  </Link>
                </Dropdown.Option>
              </Dropdown.Options>
            </Dropdown>
          </div>
        ) : (
          <div className="flex flex-col gap-2 items-center sm:flex-row">
            <Link href="/api/auth/login">
              <Button className="bg-dodoria w-32">Log in</Button>
            </Link>
          </div>
        )}
      </header>
      <CreateCommunityModal open={openCreateCommunityModal} onClose={closeCreateCommunityModal} />
    </>
  );
};

export default Header;
