import { Wallet } from 'ethers';
import { generateWalletFromPin } from 'helpers/blockchain/wallet';

describe('Generate wallet from pin', () => {
  let pin;
  let generated;
  beforeEach(async () => {
    pin = '123456-abcdef';
    generated = await generateWalletFromPin(pin);
  })
  it('is able to decrypt generated wallet with a valid pin', async () => {
    const decrypted = await Wallet.fromEncryptedJson(JSON.parse(generated.wallet), pin);
    expect(decrypted.address).toEqual(generated.address);
  })
  it('fails to decript with an invalid pin', async () => {
    await expect(
      Wallet.fromEncryptedJson(
        JSON.parse(generated.wallet),
        '1234')
    )
      .rejects
      .toThrow();
  })
  it('must also contain mnemonic, iv and address', async () => {
    expect(Object.keys(generated)).toEqual(['address', 'wallet', 'mnemonic', 'iv']);
  })
});
