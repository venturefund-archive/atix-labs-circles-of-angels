import { Wallet } from 'ethers';

export const encryptWallet = async (wallet, password) => {
  if (!password) throw new Error('a password is required to encrypt a wallet');
  if (!wallet || !(wallet instanceof Wallet))
    throw new Error('wallet is not valid');
  return wallet.encrypt(password);
};
export const decryptJsonWallet = async (jsonWallet, password) => {
  if (!password) throw new Error('a password is required to decrypt a wallet');
  return Wallet.fromEncryptedJson(jsonWallet, password);
};
export const generateWalletFromMnemonic = mnemonic => {
  if (!mnemonic) {
    throw new Error('a mnemonic is required to generate the wallet');
  }

  return Wallet.fromMnemonic(mnemonic);
};

export const createNewWallet = async password => {
  if (!password) throw new Error('a password is required to create a wallet');
  const newWallet = Wallet.createRandom();
  const { mnemonic, address } = newWallet;
  const wallet = await encryptWallet(newWallet, password);
  return {
    mnemonic,
    address,
    wallet,
  };
};

export const signTransaction = async (jsonWallet, transaction, password) => {
  if (!transaction) throw new Error('a transaction is required');
  // eslint-disable-next-line no-param-reassign
  delete transaction.from;
  const wallet = await decryptJsonWallet(jsonWallet, password);
  return wallet.signTransaction(transaction);
};

export const generateWalletFromPin = async (pin) => {
  const _wallet = await createNewWallet(pin)
  const { iv } = JSON.parse(_wallet.wallet).Crypto.cipherparams
  const newWallet = {
    wallet: _wallet.wallet,
    mnemonic: _wallet.mnemonic.phrase,
    address: _wallet.address,
    iv,
  }
  return newWallet
}
