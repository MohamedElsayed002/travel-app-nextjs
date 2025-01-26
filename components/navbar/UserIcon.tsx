import { fetchProfileImage } from '@/utils/actions';
import { User2 } from 'lucide-react';
async function UserIcon() {
  const profileImage = await fetchProfileImage();
  console.log(profileImage)
  if (profileImage)
    return (
      <img src={profileImage} className='w-6 h-6 rounded-full object-cover' />
    );
  return <User2 className='w-6 h-6 bg-primary rounded-full text-white' />;
}
export default UserIcon;