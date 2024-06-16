import AddImageInput from '@/app/components/AddImageInput';
import ImageListDisplay from '@/app/components/ImageListDisplay';
import Required from '@/app/components/Required';
import UseFormInput from '@/app/components/UseFormInput';
import UseFormTextArea from '@/app/components/UseFormTextArea';
import { MappedCommunity } from '@/app/model/mapped-community';
import { useGoals } from '@/app/services/useGoals';
import { Button, IconButton, Modal } from '@heathmont/moon-core-tw';
import { ControlsClose, ControlsPlus } from '@heathmont/moon-icons-tw';
import { NFTStorage } from 'nft.storage';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

let addedDate = false;
export default function CreateGoalModal({ open, onClose, community }: { open: boolean; onClose: any; community: MappedCommunity }) {
  const [goalImage, setGoalImage] = useState([] as any[]);
  const [isCreating, setIsCreating] = useState(false);
  const { createGoal } = useGoals();

  const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJDMDBFOGEzZEEwNzA5ZkI5MUQ1MDVmNDVGNUUwY0Q4YUYyRTMwN0MiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NDQ3MTgxOTY2NSwibmFtZSI6IlplbmNvbiJ9.6znEiSkiLKZX-a9q-CKvr4x7HS675EDdaXP622VmYs8';

  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  const [name, nameInput] = UseFormInput({
    defaultValue: '',
    type: 'text',
    placeholder: 'Name',
    id: 'name'
  });

  const [description, descriptionInput] = UseFormTextArea({
    defaultValue: '',
    placeholder: 'Description',
    id: 'description',
    rows: 4
  });

  const [endDate, endDateInput, setEndDate] = UseFormInput({
    defaultValue: '',
    type: 'date',
    placeholder: 'End date',
    id: 'enddate'
  });

  const [target, targetInput] = UseFormInput({
    defaultValue: '',
    type: 'number',
    placeholder: '0.00',
    id: 'target'
  });

  async function create() {
    setIsCreating(true);

    const toastId = toast('Uploading IPFS ...', { autoClose: false, isLoading: true, type: 'info' });

    let ipfsImage = '';

    if (goalImage.length) {
      const element = goalImage[0];
      const metadata = await client.storeBlob(element);

      ipfsImage = 'https://' + metadata + '.ipfs.nftstorage.link';
    }

    toast.update(toastId, { render: 'Creating Goal...' });

    await createGoal(name, description, ipfsImage, community.address.toString(), Number(target), endDate);
    toast.update(toastId, { type: 'success', render: 'Goal created successfully!', autoClose: 1000, isLoading: false });

    onClose({ success: true });
  }

  function filehandleChange(goal: any) {
    const allNames = [];
    for (let index = 0; index < goal.target.files.length; index++) {
      const element = goal.target.files[index].name;
      allNames.push(element);
    }
    for (let index2 = 0; index2 < goal.target.files.length; index2++) {
      setGoalImage((pre) => [...pre, goal.target.files[index2]]);
    }
  }

  function deleteSelectedImages(imageId: number) {
    //Deleting the selected image
    const newImages = [];
    const allUploadedImages = document.getElementsByName('deleteBTN');
    for (let index = 0; index < goalImage.length; index++) {
      if (index != imageId) {
        const elementDeleteBTN = allUploadedImages[index];
        elementDeleteBTN.setAttribute('id', newImages.length.toString());
        const element = goalImage[index];
        newImages.push(element);
      }
    }
    setGoalImage(newImages);
  }

  function addImage() {
    const goalImage = document.getElementById('goalImage') as HTMLElement;
    goalImage.click();
  }

  function isInvalid() {
    return !(name && description && target && endDate && goalImage.length > 0);
  }

  useEffect(() => {
    let dateTime = new Date();
    if (!addedDate) setEndDate(dateTime.toISOString().split('T')[0]);
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Backdrop />
      <Modal.Panel className="bg-gohan max-w-none w-screen h-screen absolute left-0 sm:relative sm:h-auto sm:w-[90%] sm:max-w-[600px] sm:max-h-[90vh] !rounded-none sm:!rounded-xl">
        <div className={`flex items-center justify-center flex-col`}>
          <div className="flex justify-between items-center w-full border-b border-beerus py-4 px-6">
            <h1 className="text-moon-20 font-semibold">Create goal</h1>
            <IconButton className="text-trunks" variant="ghost" icon={<ControlsClose />} onClick={onClose} />
          </div>
          <div className="flex flex-col gap-6 w-full p-6  max-h-[calc(90vh-162px)] overflow-auto">
            <div className="flex flex-col gap-2">
              <h6>
                Goal name
                <Required />
              </h6>
              {nameInput}
            </div>

            <div className="flex flex-col gap-2">
              <h6>
                Description
                <Required />
              </h6>
              {descriptionInput}
            </div>
            <div className="flex gap-8 w-full">
              <div className="flex flex-col gap-2 w-full">
                <h6>
                  Goal amount in AVAX
                  <Required />
                </h6>
                {targetInput}
              </div>
            </div>
            <div className="flex gap-8 w-full">
              <div className="flex-1">
                <h6>
                  End Date
                  <Required />
                </h6>
                {endDateInput}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h6>
                Image
                <Required />
              </h6>
              <div className="content-start flex flex-row flex-wrap gap-4 justify-start overflow-auto relative text-center text-white w-full">
                <input className="file-input" hidden onChange={filehandleChange} accept="image/*" id="goalImage" name="goalImage" type="file" />
                <div className="flex flex-col">
                  {goalImage.length < 1 && <AddImageInput onClick={addImage} />}
                  <ImageListDisplay images={goalImage} onDeleteImage={deleteSelectedImages} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between border-t border-beerus w-full p-6 gap-4 absolute sm:relative bottom-0">
          <Button variant="ghost" onClick={onClose} className="flex-1 sm:flex-none">
            Cancel
          </Button>
          <Button animation={isCreating ? 'progress' : false} disabled={isCreating || isInvalid()} onClick={create} className="flex-1 sm:flex-none">
            <ControlsPlus className="text-moon-24" />
            Create goal
          </Button>
        </div>
      </Modal.Panel>
    </Modal>
  );
}
