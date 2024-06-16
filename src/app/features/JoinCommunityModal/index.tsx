import React, { useState } from 'react';
import { Button, IconButton, Modal } from '@heathmont/moon-core-tw';
import { ControlsClose } from '@heathmont/moon-icons-tw';
import { useWeb3 } from '@/app/services/useWeb3';
import { useCommunities } from '@/app/services/useCommunities';
import { MappedCommunity } from '@/app/model/mapped-community';
import { toast } from 'react-toastify';

export default function JoinCommunityModal({ open, onClose, community }: { open: boolean; onClose: any; community: MappedCommunity }) {
  const [isLoading, setIsLoading] = useState(false);

  const { balance } = useWeb3();
  const { joinCommunity } = useCommunities();

  const join = async () => {
    setIsLoading(true);
    const toastId = toast('Joining Community...', { isLoading: true, autoClose: false, type: 'info' });

    await joinCommunity(community.address, community.subscriptionPrice.toString());

    setIsLoading(false);
    toast.update(toastId, { type: 'success', render: 'Community joined successfully!', autoClose: 1000, isLoading: false });

    onClose({ success: true });
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Backdrop />
      <Modal.Panel className="bg-gohan w-[90%] max-w-[480px]">
        <div className={`flex items-center justify-center flex-col`}>
          <div className="flex justify-between items-center w-full border-b border-beerus py-4 px-6">
            <h1 className="text-moon-20 font-semibold">Join charity &quot;{community.name}&quot;</h1>
            <IconButton className="text-trunks" variant="ghost" icon={<ControlsClose />} onClick={onClose} />
          </div>

          <div className="flex flex-col gap-3 w-full p-8">
            <div className="flex justify-between pt-8">
              <h4 className="font-semibold text-moon-18">Total</h4>
              <h4 className="font-semibold text-moon-18">{community.subscriptionPrice} AVAX</h4>
            </div>

            <div className="flex justify-between">
              <h4 className="font-semibold text-moon-18">Coin</h4>
              <h4 className="font-semibold text-moon-18"></h4>
            </div>

            {community.subscriptionPrice > Number(balance) ? <p className="pt-5 text-right text-raditz">Insufficient funds</p> : <p className="pt-5 text-right">Your balance is {balance} AVAX</p>}
          </div>

          <div className="flex justify-between border-t border-beerus w-full p-6">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={join} animation={isLoading ? 'progress' : false}>
              Join
            </Button>
          </div>
        </div>
      </Modal.Panel>
    </Modal>
  );
}
