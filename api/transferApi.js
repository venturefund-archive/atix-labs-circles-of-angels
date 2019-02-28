import api from "./api";

const sendTransferInformation = async ({
  transferId,
  amount,
  currency,
  senderId,
  projectId,
  destinationAccount
}) => {
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
      `/transfer/${transferId}/sendToVerification`,
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
    return error.message;
  }
};

const getTransferDestinationInfo = async () => {
  try {
    const response = await api.get(`/general/accountDestination`);
    console.log(response.data.bankAccount);
    return response.data.bankAccount;
  } catch (error) {
    return error.menssage;
  }
};

const getTransferStatus = async transferId => {
  try {
    const response = await api.get(`/transfer/${transferId}/getState`);
    console.log(response);
    return response.data.state;
  } catch (error) {}
};

const getTransferListOfProject = async projectId => {
  try {
    const response = await api.get(`/transfer/${projectId}/getTransfers`);
    return response.data;
  } catch (error) {}
};

const updateStateOfTransference = async (transferId, state) => {
  try {
    const response = await api.post("/transfer/updateState",
    {
      transferId,
      state
    });
  } catch (error) {
    
  }
}

export {
  sendTransferInformation,
  getTransferDestinationInfo,
  getTransferStatus,
  getTransferListOfProject,
  updateStateOfTransference
};
