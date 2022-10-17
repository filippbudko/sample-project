export const fetchClientSecret = async (
  contractID: string,
  recipientWalletAddress: string,
  email: string
) => {
  try {
    const clientSecretResp = await fetch("/api/create-client-secret", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contractID, recipientWalletAddress, email }),
    });
    return (await clientSecretResp.json()).clientSecret;
  } catch (e) {
    console.log("error fetching the client secret", e);
  }
};
