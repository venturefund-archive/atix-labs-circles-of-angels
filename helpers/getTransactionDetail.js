import Axios from 'axios';
import InputDataDecoder from 'ethereum-input-data-decoder';
import errorFormatter from './errorFormatter';

const projectAbiUrl = 'http://localhost:3001/projectAbi';
const activityAbiUrl = 'http://localhost:3001/activityAbi';

const getAbi = async url => {
  try {
    const response = await Axios.get(url);

    if (!response?.data?.abi) {
      throw new Error('Abi is not provided.');
    }
    return response.data.abi;
  } catch (error) {
    throw new Error(errorFormatter(error));
  }
};

export const mapOperationAbi = {
  send_project_to_review: () => getAbi(projectAbiUrl),
  approve_review: () => getAbi(projectAbiUrl),
  cancel_review: () => getAbi(projectAbiUrl),
  activity_to_review: () => getAbi(activityAbiUrl),
  approve_activity: () => getAbi(activityAbiUrl),
  reject_activity: () => getAbi(activityAbiUrl)
};

const getInput = async transactionHash => {
  const isProduction = process.env.NODE_ENV === 'production';
  const url = isProduction
    ? `https://blockscout.com/rsk/mainnet/api?module=transaction&action=gettxinfo&txhash=${transactionHash}`
    : `http://localhost:3001/tx/${transactionHash}`;

  try {
    const response = await Axios.get(url);

    const input = isProduction ? response.data.result?.input : response.data?.input;

    if (!input) {
      throw new Error('Input is undefined');
    }

    return input;
  } catch (error) {
    throw new Error(errorFormatter(error));
  }
};

export const getTransactionDetails = async ({ action, transactionHash }) => {
  const input = await getInput(transactionHash);

  const _getAbi = mapOperationAbi[action];
  if (!_getAbi) {
    throw new Error(`Action ${action} is not recognized`);
  }

  const abi = await _getAbi();

  const decoder = new InputDataDecoder(abi);

  const result = decoder.decodeData(input);
  const { inputs, names } = result;
  if (!inputs || !names) throw new Error('Details of the transaction are undefined');

  const txDetails = {};

  inputs.forEach((_input, index) => {
    const name = names[index];
    if (!name) return;
    txDetails[name] = _input;
  });

  return txDetails;
};
