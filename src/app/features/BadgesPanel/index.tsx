import Badge from '@/app/components/Badge';
import Card from '@/app/components/Card';
import { GenericHeart, GenericIdea, GenericUser, GenericUsers, ShopWallet, SportDarts } from '@heathmont/moon-icons-tw';

const BadgesPanel = ({ badges }: { badges: string[] }) => (
  <Card>
    <div className="flex flex-wrap w-full gap-2">
      <Badge icon={<GenericUser />} label="Basic" description="All essential community functions" granted />
      <Badge icon={<GenericUsers />} label="First community" description="Created a DAO community" granted />
      <Badge icon={<GenericUsers />} label="First join" description="Joined a DAO community" granted={badges.includes('communityJoined')} />
      <Badge icon={<GenericIdea />} label="First idea" description="Created an idea" granted={badges.includes('ideaCreated')} />
      <Badge icon={<GenericHeart />} label="First vote" description="Voted on an idea" granted />
      <Badge icon={<ShopWallet />} label="First donation" description="Donated to an idea" granted />
      <Badge icon={<SportDarts />} label="First goal" description="Created a goal" granted={badges.includes('goalCreated')} />
    </div>
  </Card>
);
export default BadgesPanel;
