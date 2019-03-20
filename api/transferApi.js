import api from "./api";

const baseURL = "/transfer";

const sendTransferInformation = async ({
  transferId,
  amount,
  currency,
  senderId,
  projectId,
  destinationAccount
}) => {
  console.log("Sending trasfer info to verificate");
  try {
    if (
      !amount ||
      !currency ||
      !senderId ||
      !projectId ||
      !destinationAccount ||
      amount < 1 ||
      senderId < 0 ||
      projectId < 0
    )
      return;
    const response = await api.post(
      `${baseURL}/${transferId}/sendToVerification`,
      {
        amount,
        currency,
        senderId,
        projectId,
        destinationAccount
      }
    );
    return response;
  } catch (error) {
    return { error: error };
  }
};

const getTransferDestinationInfo = async () => {
  try {
    const response = await api.get(`/general/accountDestination`);
    console.log("Geting transfer destination data");
    return response.data.bankAccount;
  } catch (error) {
    return error.menssage;
  }
};

const getTransferStatus = async ({userId, projectId}) => {
  try {
    const response = await api.get(`${baseURL}/${userId}/${projectId}/getState`);
    console.log(response);
    return response.data.state;
  } catch (error) {}
};

const getTransferListOfProject = async projectId => {
  try {
    const response = await api.get(`${baseURL}/${projectId}/getTransfers`);
    let transfers = response.data;
    if (!transfers) return [];
    let key = 0;
    transfers.map(t => {
      t.key = key;
      key++;
    });
    return transfers;
  } catch (error) {}
};

const updateStateOfTransference = async (transferId, state) => {
  try {
    const response = await api.post(`${baseURL}/updateState`, {
      transferId,
      state
    });
  } catch (error) {}
};

export {
  sendTransferInformation,
  getTransferDestinationInfo,
  getTransferStatus,
  getTransferListOfProject,
  updateStateOfTransference
};
