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
  if (!pin && pin.length >= 12) throw new Error('Pin must be length 12 or longer');
  const random = Wallet.createRandom();
  const {
    address,
  } = random;
  // Until we find the real cause mnemonic is inconsistent between environment
  const mnemonic = typeof random.mnemonic === 'object' ? random.mnemonic.phrase : random.mnemonic
  const encrypted = await random.encrypt(pin);
  const { Crypto: { cipherparams: { iv } } } = JSON.parse(encrypted)
  return {
    address,
    wallet: encrypted,
    mnemonic,
    iv
  };
}

export const encrypt = async (data, key) => {
    const iv = await crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encryptedText = cipher.update(data);
    encryptedText = Buffer.concat([encryptedText, cipher.final()]);
    return {
      encryptedData: encryptedText.toString('hex'),
      iv: iv.toString('hex')
    };
} 
