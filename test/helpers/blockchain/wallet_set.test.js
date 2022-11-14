import { Wallet } from 'ethers';
import { generateWalletFromPin } from 'helpers/blockchain/wallet';

describe('Generate wallet from pin', () => {
  let pin, generated
  beforeEach(async () => {
    pin = '123456'
    generated = await generateWalletFromPin(pin)
  })
  it('is able to decrypt generated wallet with a valid pin', async () => {
    const decripted = await Wallet.fromEncryptedJson(generated.wallet, pin)

    expect(decripted.address).toEqual(generated.address)
  })
  it('fails to decript with an invalid pin', async () => {
    await expect(
      Wallet.fromEncryptedJson(
        generated.wallet,
        '1234')
    )
      .rejects
      .toThrow();
  })
});
