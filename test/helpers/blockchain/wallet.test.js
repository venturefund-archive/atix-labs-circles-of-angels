import { Wallet } from 'ethers';
import { isHexString } from 'ethers/utils';
import {
  createNewWallet,
  encryptWallet,
  decryptJsonWallet,
  generateWalletFromMnemonic,
  signTransaction
} from '../../../helpers/blockchain/wallet';

describe('Testing wallet methods', () => {
  describe('Create new wallet', () => {
    it(
      'should create a new random wallet and return the mnemonic, ' +
        'address and the encrypted json wallet',
      async () => {
        const response = await createNewWallet('password');
        expect(response.address).toEqual(expect.any(String));
        expect(response.mnemonic).toEqual(expect.any(String));
        expect(response.encryptedWallet).toEqual(expect.any(String));
      }
    );
    it('should throw an error if no password was provided', async () => {
      await expect(createNewWallet()).rejects.toThrow(
        'a password is required to create a wallet'
      );
    });
  });

  describe('Encrypt wallet to json', () => {
    it('should return an encrypted json wallet', async () => {
      const randomWallet = Wallet.createRandom();
      const encrypted = await encryptWallet(randomWallet, 'password');
      expect(encrypted).toEqual(expect.any(String));
      expect(JSON.parse(encrypted).Crypto).toBeDefined();
    });

    it('should throw an error if the password was not provided', async () => {
      const randomWallet = Wallet.createRandom();
      await expect(encryptWallet(randomWallet)).rejects.toThrow(
        'a password is required to encrypt a wallet'
      );
    });

    it('should throw an error if the wallet is undefined', async () => {
      await expect(encryptWallet(undefined, 'password')).rejects.toThrow(
        'wallet is not valid'
      );
    });

    it('should throw an error if the wallet is not valid', async () => {
      await expect(encryptWallet({}, 'password')).rejects.toThrow(
        'wallet is not valid'
      );
    });
  });

  describe('Decrypt json wallet', () => {
    const walletPass = 'password';
    let wallet;
    beforeAll(async () => {
      wallet = await createNewWallet(walletPass);
    });
    it('should decrypt a json wallet with a password and match the address', async () => {
      const decrypted = await decryptJsonWallet(
        wallet.encryptedWallet,
        walletPass
      );
      expect(decrypted.address).toEqual(wallet.address);
    });

    it(
      'should throw an error when trying to decrypt a json wallet ' +
        'with a wrong password',
      async () => {
        await expect(
          decryptJsonWallet(wallet.encryptedWallet, 'wrong')
        ).rejects.toThrow('invalid password');
      }
    );

    it('should throw an error is the password is not provided', async () => {
      await expect(decryptJsonWallet(wallet.encryptedWallet)).rejects.toThrow(
        'a password is required to decrypt a wallet'
      );
    });
  });

  describe('Generate wallet from mnemonic', () => {
    it('should generate a wallet from a mnemonic', () => {
      const randomWallet = Wallet.createRandom();
      const generatedWallet = generateWalletFromMnemonic(randomWallet.mnemonic);
      expect(generatedWallet).toEqual(randomWallet);
    });

    it('should throw an error if the mnemonic was not provided', () => {
      expect(() => generateWalletFromMnemonic()).toThrow(
        'a mnemonic is required to generate the wallet'
      );
    });
  });

  describe('Sign transaction', () => {
    const transaction = {
      to: '0x0EaA277c373E72B9f86B2F851e94aa227a6ADd00',
      gasLimit: Number('0x52445'),
      data:
        '0x0472aa82000000000000000000000000ea51cfb26e6547725835' +
        'b4138ba96c0b5de9e54ac19c3cbd0f7adaa241f1098d4459cc3510' +
        '3836927ecb48d2fa7432911f3945f82f85fdd8a32c7d3fa08c5d63' +
        'fba190211aff23145dcaeb10c37730b22376fff800000000000000' +
        '000000000000000000000000000000000000000000000000010000' +
        '000000000000000000000000000000000000000000000000000000000118'
    };
    const walletPass = 'password';
    let encryptedWallet;
    beforeAll(async () => {
      ({ encryptedWallet } = await createNewWallet(walletPass));
    });
    it(
      'should sign the transaction with the wallet ' +
        'if the password is correct',
      async () => {
        const signedTx = await signTransaction(
          encryptedWallet,
          transaction,
          walletPass
        );
        expect(isHexString(signedTx)).toEqual(true);
      }
    );
    it('should throw an error if the password is invalid', async () => {
      await expect(
        signTransaction(encryptedWallet, transaction, 'wrong')
      ).rejects.toThrow('invalid password');
    });
    it('should throw an error is the password is not provided', async () => {
      await expect(
        signTransaction(encryptedWallet, transaction)
      ).rejects.toThrow('a password is required to decrypt a wallet');
    });
    it('should throw an error is the tx is not provided', async () => {
      await expect(
        signTransaction(encryptedWallet, undefined, walletPass)
      ).rejects.toThrow('a transaction is required');
    });
  });
});
