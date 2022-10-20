/* eslint-disable @next/next/no-img-element */
import {
  CheckoutWithCard,
  CheckoutWithEth,
  CreateWallet,
  PaperSDKProvider,
  PaperUser,
} from "@paperxyz/react-client-sdk";
import "@paperxyz/react-client-sdk/dist/index.css";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { fetchClientSecret } from "../lib/utils";
import styles from "../styles/Theme.module.css";

// Put Your Contract Address here
const CONTRACT_ADDRESS = "0x4d0ae5B29Ee282CBaad2678DfD7909F0cf4770A2";

// Put your contract ID here
const contractID = "a97715b8-f7d5-4883-b8e2-2bd52d926fd0";

enum CheckoutPage {
  CHOOSE_WALLET = "CHOOSE_WALLET",
  CHOOSE_PAYMENT_METHOD = "CHOOSE_PAYMENT_METHOD",
  CHECKOUT_WITH_CARD = "CHECKOUT_WITH_CARD",
  CHECKOUT_WITH_ETH = "CHECKOUT_WITH_ETH",
  PAYMENT_COMPLETE = "PAYMENT_COMPLETE",
}

const Home: NextPage = () => {
  // The user's wallet address
  const [recipientWalletAddress, setRecipientWalletAddress] = useState("");

  const [currentPage, setCurrentPage] = useState(CheckoutPage.CHOOSE_WALLET);

  const [email, setEmail] = useState("");


  return (
    <PaperSDKProvider chainName="Goerli">
      
      <div id="background-wrap">
      
        <div className="bubble x1"></div>
        <div className="bubble x2"></div>
        <div className="bubble x3"></div>
        <div className="bubble x4"></div>
        <div className="bubble x5"></div>
        <div className="bubble x6"></div>
        <div className="bubble x7"></div>
        <div className="bubble x8"></div>
        <div className="bubble x9"></div>
        <div className="bubble x10"></div>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            src={`/logo.png`}
            alt="Paper Logo"
            width={380}
            className={styles.logo}
          />
        </div>
        <div className={styles.mintInfoContainer}>
          <div className={styles.imageSide}>
            {/* Image Preview of NFTs */}
            <img
              src={`/crab.png`}
              alt="Crab NFT"
              className={styles.image}
            />
          </div>

          <div className={styles.infoSide}>
            {/* Title of your NFT Collection */}
            <p className={styles.infoTitle}>Under The Sea Collection</p>
            {/* Description of your NFT Collection */}
            <p className={styles.description}>Cute crab #2</p>

            {(() => {
              switch (currentPage) {
                case CheckoutPage.CHOOSE_WALLET:
                  return (
                    <ChooseWalletPage
                      setRecipientWalletAddress={setRecipientWalletAddress}
                      setCurrentPage={setCurrentPage}
                      setEmail={setEmail}
                      email={email}
                    />
                  );
                case CheckoutPage.CHOOSE_PAYMENT_METHOD:
                  return (
                    <ChoosePaymentMethodPage setCurrentPage={setCurrentPage} />
                  );
                case CheckoutPage.CHECKOUT_WITH_CARD:
                  return (
                    <CheckoutWithCardPage
                      recipientWalletAddress={recipientWalletAddress}
                      setCurrentPage={setCurrentPage}
                      email={email}
                    />
                  );
                case CheckoutPage.CHECKOUT_WITH_ETH:
                  return (
                    <CheckoutWithEthPage
                      recipientWalletAddress={recipientWalletAddress}
                      setCurrentPage={setCurrentPage}
                      email={email}
                    />
                  );
                case CheckoutPage.PAYMENT_COMPLETE:
                  return <PaymentCompletePage />;
              }
            })()}
          </div>
        </div>
      </div>
    </PaperSDKProvider>
  );
};

export default Home;

// choose wallet page
const ChooseWalletPage = (props: {
  setRecipientWalletAddress: (walletAddress: string) => void;
  setCurrentPage: (page: CheckoutPage) => void;
  setEmail: (e: string) => void;
  email: string;
}) => {
  const setRecipientWalletAddress = props.setRecipientWalletAddress;
  const setCurrentPage = props.setCurrentPage;
  const setEmail = props.setEmail;
  const email = props.email;

  return (
    <div>
      <p className={styles.spacerBottom}>Please enter your email below:</p>
      <label className={styles.customfield}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <span className={styles.placeholder}>Enter Email</span>
      </label>
      
      <CreateWallet
        emailAddress={email}
        onSuccess={(user: PaperUser) => {
          console.log("CreateWallet callback", user);
          console.log(email);
          setRecipientWalletAddress(user.walletAddress);
          setCurrentPage(CheckoutPage.CHOOSE_PAYMENT_METHOD);
        }}
        onError={(error) => {
          console.log("error", error);
        }}
      >
        {/* @ts-ignore */}
        <button className={styles.mainButton}>
          Verify Email
        </button>
      </CreateWallet>
    </div>
  );
};

// choose payment page
const ChoosePaymentMethodPage = (props: {
  setCurrentPage: (page: CheckoutPage) => void;
}) => {
  const setCurrentPage = props.setCurrentPage;

  return (
    <div>
      <button
        className={styles.mainButton}
        onClick={() => setCurrentPage(CheckoutPage.CHECKOUT_WITH_CARD)}
      >
        Pay With Card
      </button>
      <button
        className={styles.mainButton}
        onClick={() => setCurrentPage(CheckoutPage.CHECKOUT_WITH_ETH)}
      >
        Pay With ETH
      </button>
    </div>
  );
};

// pay with card page
const CheckoutWithCardPage = (props: {
  recipientWalletAddress: string;
  setCurrentPage: (page: CheckoutPage) => void;
  email: string;
}) => {
  const recipientWalletAddress = props.recipientWalletAddress;
  const setCurrentPage = props.setCurrentPage;
  const email = props.email;

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetchClientSecret(contractID, recipientWalletAddress, email).then(
      (clientSecret) => {
        console.log(clientSecret)
        setClientSecret(clientSecret);
      }
    ).catch(e =>
      console.log(e));

  }, [email, recipientWalletAddress]);

  return (
    <div>
      {!!clientSecret && (
        <CheckoutWithCard
          sdkClientSecret={clientSecret}
          options={{
            colorBackground: "transparent",
            colorPrimary: "#19A8D6",
            colorText: "#fff",
            borderRadius: 6,
          }}
          onPaymentSuccess={(result: { id: string }) => {
            console.log("PayWithCard callback", result);
            setCurrentPage(CheckoutPage.PAYMENT_COMPLETE);
          }}
        />
      )}
    </div>
  );
};

// pay with crypto page
const CheckoutWithEthPage = (props: {
  recipientWalletAddress: string;
  setCurrentPage: (page: CheckoutPage) => void;
  email: string;
}) => {
  const recipientWalletAddress = props.recipientWalletAddress;
  const setCurrentPage = props.setCurrentPage;
  const email = props.email;
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetchClientSecret(contractID, recipientWalletAddress, email).then(
      (clientSecret) => {
        setClientSecret(clientSecret);
      }
    );
  }, [email, recipientWalletAddress]);

  return (
    <div>
      {!!clientSecret && (
        <CheckoutWithEth
          sdkClientSecret={clientSecret}
          options={{
            colorBackground: "transparent",
            colorPrimary: "#fff",
            colorText: "#fff",
            borderRadius: 6,
          }}
          onSuccess={(args: { transactionId: string }) => {
            console.log("PayWithCrypto callback", args);
            setCurrentPage(CheckoutPage.PAYMENT_COMPLETE);
          }}
        />
      )}
    </div>
  );
};

// pay with crypto page
const PaymentCompletePage = () => {
  return (
    <div>
      <p className={styles.spacerBottom}>
        Thanks for claiming the this NFT! Click
        the button below to view your Paper Wallet and view your NFT.
      </p>
      <button className={styles.mainButton}>
        <a href="https://paper.xyz/wallet" target="_blank" rel="noreferrer">
          Paper Wallet
        </a>
      </button>
    </div>
  );
};
