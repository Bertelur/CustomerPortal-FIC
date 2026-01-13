import Transaksi from "../../Components/Organisms/Transaksi";
import UserProfile from "../../Components/Organisms/UserProfile";

const Profile = () => {
  return (
    <div className="max-w-7xl mx-4  md:mx-auto px-4 mt-10 ">
      <UserProfile />
      <Transaksi />
    </div>
  );
};

export default Profile;
