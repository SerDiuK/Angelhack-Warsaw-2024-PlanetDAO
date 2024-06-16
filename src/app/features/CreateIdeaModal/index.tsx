import AddImageInput from '@/app/components/AddImageInput';
import ImageListDisplay from '@/app/components/ImageListDisplay';
import Required from '@/app/components/Required';
import UseFormInput from '@/app/components/UseFormInput';
import UseFormTextArea from '@/app/components/UseFormTextArea';
import { MappedGoal } from '@/app/model/mapped-goal';
import { useIdeas } from '@/app/services/useIdeas';
import { Button, IconButton, Modal } from '@heathmont/moon-core-tw';
import { ControlsClose, ControlsPlus } from '@heathmont/moon-icons-tw';
import { NFTStorage } from 'nft.storage';
import React, { useState } from 'react';

import { toast } from 'react-toastify';

export default function CreateIdeaModal({ open, onClose, goal }: { open: boolean; onClose: any; goal: MappedGoal }) {
  const [ideaImage, setIdeaImage] = useState([] as any[]);
  const [isCreating, setIsCreating] = useState(false);
  const { createIdea } = useIdeas();

  const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJDMDBFOGEzZEEwNzA5ZkI5MUQ1MDVmNDVGNUUwY0Q4YUYyRTMwN0MiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NDQ3MTgxOTY2NSwibmFtZSI6IlplbmNvbiJ9.6znEiSkiLKZX-a9q-CKvr4x7HS675EDdaXP622VmYs8';

  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  const [name, nameInput] = UseFormInput({
    defaultValue: '',
    type: 'text',
    placeholder: 'Name',
    id: ''
  });

  const [description, descriptionInput] = UseFormTextArea({
    defaultValue: '',
    placeholder: 'Description',
    id: '',
    rows: 4
  });

  const [donationsTarget, donationsTargetInput] = UseFormInput({
    defaultValue: '',
    type: 'number',
    placeholder: '0.00',
    id: 'target'
  });

  async function create() {
    const toastId = toast('Uploading IPFS ...', { autoClose: false, isLoading: true, type: 'info' });
    setIsCreating(true);

    let ipfsImage = '';

    if (ideaImage.length) {
      const element = ideaImage[0];
      const metadata = await client.storeBlob(element);

      ipfsImage = 'https://' + metadata + '.ipfs.nftstorage.link';
    }

    toast.update(toastId, { render: 'Creating Idea...' });

    await createIdea(name, description, ipfsImage, goal.address, Number(donationsTarget));

    toast.update(toastId, { type: 'success', render: 'Idea created successfully!', autoClose: 1000, isLoading: false });

    onClose({ success: true });
  }

  function filehandleChange(ideas: any) {
    // If user uploaded images/videos
    const allNames = [];
    for (let index = 0; index < ideas.target.files.length; index++) {
      const element = ideas.target.files[index].name;
      allNames.push(element);
    }
    for (let index2 = 0; index2 < ideas.target.files.length; index2++) {
      setIdeaImage((pre) => [...pre, ideas.target.files[index2]]);
    }
  }

  function deleteSelectedImages(imageId: number) {
    //Deleting the selected image
    const newImages = [];
    const allUploadedImages = document.getElementsByName('deleteBTN');
    for (let index = 0; index < ideaImage.length; index++) {
      if (index != imageId) {
        const elementDeleteBTN = allUploadedImages[index];
        elementDeleteBTN.setAttribute('id', newImages.length.toString());
        const element = ideaImage[index];
        newImages.push(element);
      }
    }
    setIdeaImage(newImages);
  }

  const isInvalid = () => {
    return !(name && description && ideaImage.length > 0);
  };

  const addImage = () => {
    const goalImage = document.getElementById('ideaImage') as HTMLElement;
    goalImage.click();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Backdrop />
      <Modal.Panel className="bg-gohan max-w-none w-screen h-screen absolute left-0 sm:relative sm:h-auto sm:w-[90%] sm:max-w-[600px] sm:max-h-[90vh] !rounded-none sm:!rounded-xl">
        <div className="flex items-center justify-center flex-col">
          <div className="flex justify-between items-center w-full border-b border-beerus py-4 px-6">
            <h1 className="text-moon-20 font-semibold">Create idea</h1>
            <IconButton className="text-trunks" variant="ghost" icon={<ControlsClose />} onClick={onClose} />
          </div>
          <div className="flex flex-col gap-6 w-full p-6 max-h-[calc(90vh-162px)] overflow-auto">
            <div className="flex flex-col gap-2">
              <h6>
                Idea name
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

            <div className="flex flex-col gap-2">
              <h6>
                Target
                <Required />
              </h6>
              {donationsTargetInput}
            </div>

            <div className="flex flex-col gap-2">
              <h6>
                Image
                <Required />
              </h6>
              <div className="content-start flex flex-row flex-wrap gap-4 justify-start overflow-auto p-1 relative text-center text-white w-full">
                <input className="file-input" hidden onChange={filehandleChange} accept="image/*" id="ideaImage" name="ideaImage" type="file" multiple />
                <div className="flex flex-col gap-4">
                  {!ideaImage.length && <AddImageInput onClick={addImage} />}
                  <ImageListDisplay images={ideaImage} onDeleteImage={deleteSelectedImages} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between border-t border-beerus w-full p-6 gap-4 absolute bottom-0 sm:relative">
          <Button variant="ghost" onClick={onClose} className="flex-1 sm:flex-none">
            Cancel
          </Button>
          <Button animation={isCreating ? 'progress' : false} disabled={isCreating || isInvalid()} onClick={create} className="flex-1 sm:flex-none">
            <ControlsPlus className="text-moon-24" />
            Create idea
          </Button>
        </div>
      </Modal.Panel>
    </Modal>
  );
}
