import { Dropdown, MenuItem } from '@heathmont/moon-core-tw';
import { ControlsChevronDown } from '@heathmont/moon-icons-tw';
import { MappedCommunity } from '@/app/model/mapped-community';
import { useRouter } from 'next/navigation';

const CommunitySwitcher = ({ joinedCommunities, currentCommunity }: { currentCommunity: MappedCommunity; joinedCommunities: MappedCommunity[] }) => {
  const router = useRouter();

  function goToCommunity(community: MappedCommunity) {
    if (currentCommunity.address !== community.address) {
      router.push(`${community.address}`);
    }
  }

  const isSelected = (community: MappedCommunity): string => {
    return currentCommunity.address === community.address ? 'font-semibold' : '';
  };

  return (
    <Dropdown value={null} onChange={() => {}} disabled={!(currentCommunity.name && joinedCommunities.length > 1)}>
      <Dropdown.Trigger className="flex items-center gap-1">
        <h1 className="text-moon-32 font-bold">{currentCommunity.name}</h1>
        {currentCommunity.name && joinedCommunities.length > 1 && <ControlsChevronDown className="text-piccolo" fontSize={32} />}
      </Dropdown.Trigger>

      <Dropdown.Options className="bg-gohan w-80 truncate">
        {joinedCommunities.map((community, index) => (
          <Dropdown.Option key={index}>
            <MenuItem onClick={() => goToCommunity(community)} className={isSelected(community)}>
              {community.name}
            </MenuItem>
          </Dropdown.Option>
        ))}
      </Dropdown.Options>
    </Dropdown>
  );
};

export default CommunitySwitcher;
