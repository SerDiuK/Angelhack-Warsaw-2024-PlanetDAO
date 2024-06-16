import { Button, IconButton, Modal } from '@heathmont/moon-core-tw';
import { ControlsClose, ControlsPlus } from '@heathmont/moon-icons-tw';
import { NFTStorage } from 'nft.storage';
import { useEffect, useState } from 'react';
import AddImageInput from '../../components/AddImageInput';
import ImageListDisplay from '../../components/ImageListDisplay';
import Required from '../../components/Required';
import UseFormInput from '../../components/UseFormInput';
import UseFormTextArea from '../../components/UseFormTextArea';
import { useCommunities } from '@/app/services/useCommunities';
import { toast } from 'react-toastify';
import ColorPicker from '@/app/components/ColorPicker';

export default function CreateCommunityModal({ open, onClose }: { open: boolean; onClose: any }) {
  const [communityImage, setCommunityImage] = useState([] as any[]);
  const [communityLogo, setCommunityLogo] = useState([] as any[]);
  const [brandingColor, setBrandingColor] = useState('');
  const [creating, setCreating] = useState(false);
  const { createCommunity } = useCommunities();
  const NFT_STORAGE_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJDMDBFOGEzZEEwNzA5ZkI5MUQ1MDVmNDVGNUUwY0Q4YUYyRTMwN0MiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1NDQ3MTgxOTY2NSwibmFtZSI6IlplbmNvbiJ9.6znEiSkiLKZX-a9q-CKvr4x7HS675EDdaXP622VmYs8';

  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
  const [name, nameInput] = UseFormInput({
    defaultValue: '',
    type: 'text',
    placeholder: 'Add name',
    id: 'name'
  });

  const [description, descriptionInput] = UseFormTextArea({
    defaultValue: '',
    placeholder: 'Add Description',
    id: 'description',
    rows: 4
  });

  const [startDate, startDateInput, setStartDate] = UseFormInput({
    defaultValue: '',
    type: 'date',
    placeholder: 'Start date',
    id: 'startDate'
  });

  const [subscriptionPrice, subscriptionPriceInput] = UseFormInput({
    defaultValue: '0',
    type: 'number',
    placeholder: '0.00',
    id: 'subscriptionPrice'
  });

  async function create() {
    setCreating(true);

    const toastId = toast('Uploading IPFS ...', { autoClose: false, isLoading: true, type: 'info' });
    let ipfsCommunityImage = '';
    let ipfsCommunityLogo = '';

    if (communityImage.length) {
      const element = communityImage[0];
      const metadata = await client.storeBlob(element);

      ipfsCommunityImage = 'https://' + metadata + '.ipfs.nftstorage.link';
    }

    if (communityLogo.length) {
      const element = communityLogo[0];
      const metadata = await client.storeBlob(element);

      ipfsCommunityLogo = 'https://' + metadata + '.ipfs.nftstorage.link';
    }

    toast.update(toastId, { render: 'Creating Community...' });

    console.log(brandingColor, ipfsCommunityLogo);

    await createCommunity(name, description, startDate, ipfsCommunityImage, '#123456', ipfsCommunityLogo, subscriptionPrice);

    toast.update(toastId, { type: 'success', render: 'Community created successfully!', autoClose: 1000, isLoading: false });

    onClose({ success: true });
  }

  function filehandleChange(event: any) {
    const allNames = [];
    for (let index = 0; index < event.target.files.length; index++) {
      const element = event.target.files[index].name;
      allNames.push(element);
    }
    for (let index2 = 0; index2 < event.target.files.length; index2++) {
      setCommunityImage((pre) => [...pre, event.target.files[index2]]);
    }
  }

  function logoHandleChange(event: any) {
    const allNames = [];
    for (let index = 0; index < event.target.files.length; index++) {
      const element = event.target.files[index].name;
      allNames.push(element);
    }
    for (let index2 = 0; index2 < event.target.files.length; index2++) {
      setCommunityLogo((pre) => [...pre, event.target.files[index2]]);
    }
  }

  function addImage() {
    const communityImage = document.getElementById('communityImage') as HTMLElement;
    communityImage.click();
  }

  function addLogo() {
    const communityLogo = document.getElementById('communityLogo') as HTMLElement;
    communityLogo.click();
  }

  function deleteSelectedImages(imageId: number) {
    const newImages = [] as any[];

    for (let index = 0; index < communityImage.length; index++) {
      if (index != imageId) {
        const element = communityImage[index];
        newImages.push(element);
      }
    }
    setCommunityImage(newImages);
  }

  function deleteSelectedLogoImages(imageId: number) {
    const newImages = [] as any[];

    for (let index = 0; index < communityImage.length; index++) {
      if (index != imageId) {
        const element = communityLogo[index];
        newImages.push(element);
      }
    }
    setCommunityImage(newImages);
  }

  function isInvalid() {
    return !(name && description && subscriptionPrice && startDate && communityImage.length > 0);
  }

  useEffect(() => {
    let dateTime = new Date();
    setStartDate(dateTime.toISOString().split('T')[0]);
  }, []);

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Backdrop />
      <Modal.Panel className="bg-gohan max-w-none w-screen h-screen absolute left-0 sm:relative sm:h-auto sm:w-[90%] sm:max-w-[600px] sm:max-h-[90vh] !rounded-none sm:!rounded-xl">
        <div className={`flex items-center justify-center flex-col`}>
          <div className="flex justify-between items-center w-full border-b border-beerus py-4 px-6">
            <h1 className="text-moon-20 font-semibold">Create community</h1>
            <IconButton className="text-trunks" variant="ghost" icon={<ControlsClose />} onClick={() => onClose()} />
          </div>
          <div className="flex flex-col gap-6 w-full p-6  max-h-[calc(95vh-220px)] overflow-auto">
            <div className="flex flex-col gap-2">
              <h6>
                Community name
                <Required />
              </h6>
              {nameInput}
            </div>

            <div className="flex flex-col gap-2">
              <h6>
                Your community color
                <Required />
              </h6>
              <ColorPicker brandingColor={brandingColor} setBrandingColor={setBrandingColor} />
            </div>

            <div className="flex flex-col gap-2">
              <h6>
                Your community logo
                <Required />
              </h6>
              <div className="content-start flex flex-row flex-wrap gap-4 justify-start overflow-auto relative text-center text-white w-full">
                <input className="file-input" hidden onChange={logoHandleChange} accept="image/*" id="communityLogo" name="communityLogo" type="file" />
                <div className="flex flex-col">
                  {communityLogo.length < 1 && <AddImageInput onClick={addLogo} />}
                  <ImageListDisplay images={communityLogo} onDeleteImage={deleteSelectedLogoImages} />
                </div>
              </div>
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
                  Subscription Price
                  <Required />
                </h6>
                {subscriptionPriceInput}
              </div>
            </div>
            <div className="flex gap-8 w-full">
              <div className="flex-1">
                <h6>
                  Start Date
                  <Required />
                </h6>
                {startDateInput}
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h6>
                Image
                <Required />
              </h6>
              <div className="content-start flex flex-row flex-wrap gap-4 justify-start overflow-auto relative text-center text-white w-full">
                <input className="file-input" hidden onChange={filehandleChange} accept="image/*" id="communityImage" name="communityImage" type="file" />
                <div className="flex flex-col">
                  {communityImage.length < 1 && <AddImageInput onClick={addImage} />}
                  <ImageListDisplay images={communityImage} onDeleteImage={deleteSelectedImages} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h6>Vote power distribution</h6>
              <div className="flex gap-8">
                <div className="bg-white rounded-lg flex flex-1 flex-col">
                  <div className="flex w-full h-12 items-center">
                    <h6 className="text-moon-18 font-semibold flex-1">Level 1 (lowest)</h6>
                    <span className="text-trunks w-[160px]">1</span>
                    <span className="text-trunks">votes</span>
                  </div>
                  <div className="flex w-full h-12 items-center">
                    <h6 className="text-moon-18 font-semibold flex-1">Level 2</h6>
                    <span className="text-trunks w-[160px]">2</span>
                    <span className="text-trunks">votes</span>
                  </div>
                  <div className="flex w-full h-12 items-center">
                    <h6 className="text-moon-18 font-semibold flex-1">Level 3</h6>
                    <span className="text-trunks w-[160px]">3</span>
                    <span className="text-trunks">votes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between border-t border-beerus w-full p-6 gap-4 absolute sm:relative bottom-0">
          <Button variant="ghost" onClick={() => onClose()} className="flex-1 sm:flex-none">
            Cancel
          </Button>
          <Button className="flex-1 sm:flex-none" animation={creating ? 'progress' : false} disabled={creating || isInvalid()} onClick={create}>
            <ControlsPlus className="text-moon-24" />
            Create community
          </Button>
        </div>
      </Modal.Panel>
    </Modal>
  );
}
