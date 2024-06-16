import { useState } from 'react';
import { MappedIdea } from '@/app/model/mapped-idea';
import { useWeb3 } from '@/app/services/useWeb3';
import { Button, IconButton, Modal } from '@heathmont/moon-core-tw';
import { ControlsClose } from '@heathmont/moon-icons-tw';
import UseFormInput from '@/app/components/UseFormInput';
import { useIdeas } from '@/app/services/useIdeas';
import { toast } from 'react-toastify';

export default function DonateCoinModal({ idea, show, onClose }: { idea: MappedIdea; show: boolean; onClose: any }) {
  const [isLoading, setIsLoading] = useState(false);

  const { balance } = useWeb3();
  const { donate } = useIdeas();

  const [amount, amountInput] = UseFormInput({
    defaultValue: '',
    type: 'number',
    placeholder: '0.00',
    id: 'amount',
    className: 'max-w-[140px]'
  });

  const isInvalid = () => {
    return !amount;
  };

  const donateToIdea = async () => {
    const toastId = toast('Donating coins ...', { autoClose: false, isLoading: true, type: 'info' });
    setIsLoading(true);

    await donate(idea.address, amount);

    toast.update(toastId, { type: 'success', render: 'Donation successful!', autoClose: 1000, isLoading: false });
    onClose({ success: true, value: Number(amount) });
  };

  return (
    <Modal open={show} onClose={onClose}>
      <Modal.Backdrop />
      <Modal.Panel className="min-w-[480px] bg-gohan">
        <div className="flex items-center justify-center flex-col">
          <div className="flex justify-between items-center w-full border-b border-beerus py-4 px-6">
            <h1 className="text-moon-20 font-semibold">Donate to idea {idea.name}</h1>
            <IconButton className="text-trunks" variant="ghost" icon={<ControlsClose />} onClick={onClose} />
          </div>
          <div className="flex flex-col gap-6 w-full max-h-[calc(90vh-162px)]">
            <div className="flex flex-col gap-2 py-16 px-6">
              <div className="flex items-center ">
                <span className="font-semibold flex-1">Total</span>
                <div className="max-w-[140px] mr-4"> {amountInput}</div>
              </div>

              <p className="text-trunks w-full text-right">Your balance is {balance} </p>
            </div>

            <div className="flex justify-between border-t border-beerus w-full p-6">
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button animation={isLoading ? 'progress' : false} disabled={isLoading || isInvalid()} onClick={donateToIdea}>
                Donate
              </Button>
            </div>
          </div>
        </div>
      </Modal.Panel>
    </Modal>
  );
}
