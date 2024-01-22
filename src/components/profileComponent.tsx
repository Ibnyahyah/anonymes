import React from "react";
import TextFields, { InputField } from "./inputFields";
import CustomButton from "./customButton";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { checkIfChainIdIsCorrectThenContinue } from "@/utils/function";
import { BrowserProvider } from "ethers";
import { Contract } from "ethers";
import { PROFILEAddress } from "@/constants";
import { PROFILE_ABI } from "@/constants/profileAbi";
import { ErrorType } from "@/utils/types/error";

function ProfileComponent() {
  const [formData, setFormData] = React.useState({
    owner: "",
    username: "",
    fullname: "",
    bio: "I am ...",
  });
  const [loading, setLoading] = React.useState(false);
  const [active, setActive] = React.useState(true);
  const { isConnected, address, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  async function createProfile(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    checkIfChainIdIsCorrectThenContinue({
      cFn: async () => {
        try {
          console.log(formData);
          setLoading(true);
          const ethersProvider = new BrowserProvider(walletProvider!);
          const signer = await ethersProvider.getSigner();
          const ProfileContract = new Contract(
            PROFILEAddress,
            PROFILE_ABI,
            signer
          );
          const response = await ProfileContract.createUser(
            address,
            formData.username,
            formData.fullname,
            formData.bio
          );
          console.log(response);
          alert("Profile created, reload the page.");
        } catch (e) {
          alert((e as ErrorType).message);
        } finally {
          setLoading(false);
        }
      },
      chainId,
      isConnected,
    });
  }

  function closeModal() {
    setActive(false);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <div
      className={`fixed bg-white-100 h-screen w-screen ${
        active ? "flex" : "hidden"
      } items-center justify-center`}
    >
      <div className="bg-white rounded-md p-4 text-black md:w-[30%]">
        <form onSubmit={createProfile}>
          <div className="text-center">
            <h2 className="text-3xl font-[600]">Create Profile</h2>
            <p>Setup a profile to continue enjoying anonymes</p>
          </div>
          <div className="mt-7 flex flex-col gap-3">
            <InputField
              label="Username"
              name="username"
              placeholder="Enter your full name"
              onChangeInput={handleChange}
            />
            <InputField
              label="Name"
              name="fullname"
              placeholder="Enter your full name"
              onChangeInput={handleChange}
            />
            <InputField
              label="Owner"
              name="owner"
              placeholder="Enter your address"
              value={address}
            />
            <TextFields
              placeholder="Bio"
              label="Bio"
              name="bio"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setFormData({ ...formData, [e.target.name]: e.target.value });
              }}
              minTextField={true}
            />
            <div className="flex justify-center gap-x-10">
              <CustomButton
                moreStyle="bg-black text-white"
                onClick={closeModal}
              >
                Cancel
              </CustomButton>
              <CustomButton isOutlined={true} loading={loading}>
                Create Profile
              </CustomButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileComponent;
