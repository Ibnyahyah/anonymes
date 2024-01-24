import React from "react";
import TextFields from "./inputFields";
import CustomButton from "./customButton";
import {
  ErrorHandler,
  checkIfChainIdIsCorrectThenContinue,
} from "@/utils/function";
import { BrowserProvider } from "ethers";
import { Contract } from "ethers";
import { ANONYAddress } from "@/constants";
import { ANONY_MES_Abi } from "@/constants/anonyAbi";
import { ErrorType } from "@/utils/types/error";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { GlobalAppContext } from "@/context/globalContext";

type propsType = {
  setOpenCreateProfile: React.Dispatch<React.SetStateAction<boolean>>;
};

function CreateMessageForm(props: propsType) {
  const {
    getProfile,
    getMessages,
    getUserMessages,
    getRewardBalance,
  }: {
    getProfile: () => Promise<any>;
    getMessages: () => Promise<any>;
    getUserMessages: () => Promise<any>;
    getRewardBalance: () => Promise<any>;
  } = React.useContext(GlobalAppContext);
  const [loading, setLoading] = React.useState(false);
  const [isPublic, setIsPublic] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const { isConnected, chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  async function createMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    checkIfChainIdIsCorrectThenContinue({
      cFn: async () => {
        try {
          await getProfile();
          setLoading(true);
          const ethersProvider = new BrowserProvider(walletProvider!);
          const signer = await ethersProvider.getSigner();
          const AnnoyContract = new Contract(
            ANONYAddress,
            ANONY_MES_Abi,
            signer
          );
          if (message.trim() == "") throw Error("Message is required");
          const response = await AnnoyContract.createMessage(message, isPublic);
          const receipt = await response.wait(2);
          console.log(receipt);
          if (receipt.status === 1) {
            await getMessages();
            await getUserMessages();
            await getRewardBalance();
            setMessage("");
            alert("Message created");
          }
        } catch (e) {
          const err = e as ErrorType;
          if (err.message?.includes("User does not exist with this address")) {
            props.setOpenCreateProfile(true);
          } else {
            ErrorHandler(err);
          }
          console.log(err);
        } finally {
          setLoading(false);
        }
      },
      chainId,
      isConnected,
    });
  }
  return (
    <form
      className="w-full border border-white-100 rounded-md p-2"
      onSubmit={createMessage}
    >
      <select
        title="Message Type"
        className="bg-[transparent] w-[120px] outline-0 border border-white-100 mb-2 rounded-sm"
        onChange={(e) => {
          setIsPublic(e.target.value === "Public");
        }}
      >
        {["Private", "Public"].map((value, i) => (
          <option key={i} value={value}>
            {value}
          </option>
        ))}
      </select>
      <TextFields
        placeholder="What on your ...?"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        required={true}
      />
      <div className="flex justify-end mt-4">
        <CustomButton loading={loading}>Create Now</CustomButton>
      </div>
    </form>
  );
}

export default CreateMessageForm;
