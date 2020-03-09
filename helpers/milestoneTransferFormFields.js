export const transferMilestoneFormItems = {
  claimReceiptFile: {
    name: 'claimReceiptFile',
    label: 'Click to upload',
    type: 'file',
    rules: [
      {
        required: true,
        message: 'Please input the transfer file',
        validator: (_rule, value) => {
          if (value.length > 0 && value[0] instanceof File) return true;
          return false;
        }
      }
    ]
  }
};
