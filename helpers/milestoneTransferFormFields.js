export const transferMilestoneFormItems = {
  claimReceiptFile: {
    name: 'claimReceiptFile',
    label: 'Click to upload',
    type: 'file',
    fileType: 'image',
    extraInformation: 'Format: PNG or JPG',
    rules: [
      {
        required: true,
        message: 'Please input the transfer file',
        validator: (_rule, value) => {
          const checkValue = value || '';
          if (checkValue.length > 0) return true;
          if (checkValue.file && checkValue.file instanceof File) return true;
          return false;
        }
      }
    ]
  }
};
