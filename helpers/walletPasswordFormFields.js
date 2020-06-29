export const walletPasswordFormItems = {
  password: {
    name: 'password',
    label: 'Write your password',
    type: 'password',
    placeholder: 'Password',
    rules: [
      {
        required: true,
        message: 'Please input your password'
      }
    ]
  }
  // mnemonic: {
  //   name: 'mnemonic',
  //   label: 'Write the 12 words in the order that they were sent to you',
  //   type: 'textArea',
  //   rows: 6
  // }
};
