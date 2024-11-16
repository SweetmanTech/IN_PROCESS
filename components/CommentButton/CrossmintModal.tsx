import { COLLECTION_ADDRESS, MINT_FEE_RECIPIENT } from "@/lib/consts";
import { CrossmintPaymentElement } from "@crossmint/client-sdk-react-ui";

export default function CrossmintModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <CrossmintPaymentElement
          projectId="425871f2-9b99-45d6-9c9c-8b1825f28bcd"
          collectionId="0536b3aa-ef85-4a6b-891d-71ca73f6c32a"
          environment="staging"
          cardWalletPaymentMethods={["apple-pay", "google-pay"]}
          emailInputOptions={{
            show: true,
          }}
          mintConfig={{
            totalPrice: "0.000111",
            quantity: "1",
            collection: COLLECTION_ADDRESS,
            tokenId: 1,
            mintReferral: MINT_FEE_RECIPIENT,
            comment: "ETH GLOBAL BANGKOK 2024",
          }}
        />
      </div>
    </div>
  );
}