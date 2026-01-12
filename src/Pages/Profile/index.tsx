import InputField from "../../Components/Molecules/InputField";
import { Button } from "../../Components/Atoms/Button";

const Profile = () => {
  return (
    <div className="max-w-7xl mx-4  md:mx-auto px-4 border  mt-10 py-8 rounded-2xl">
      <div className="space-y-6">
        <div>Informasi Pribadi</div>
        <div className="grid md:grid-cols-2 gap-10">
          <InputField
            containerClassName="w-full"
            label="Nama Lengkap"
            name="namaLengkap"
          />
          <InputField containerClassName="w-full" label="Email" name="email" />
          <InputField
            containerClassName="w-full"
            label="Alamat"
            name="alamat"
          />
          <InputField
            containerClassName="w-full"
            label="Nomor Telepon"
            name="nomorTelepon"
          />
        </div>
        <div className="w-full border-2 " />
        <div className="grid md:grid-cols-3 gap-8">
          <InputField
            containerClassName="w-full"
            label="Password Lama"
            name="passwordLama"
            type="password"
          />
          <InputField
            containerClassName="w-full"
            label="Password Baru"
            type="password"
            name="passworBaru"
          />
          <InputField
            containerClassName="w-full"
            type="password"
            label="Konfirmasi Password"
            name="konfirmasiPassword"
          />
        </div>
        <Button>Simpan Perubahan</Button>
      </div>
    </div>
  );
};

export default Profile;
