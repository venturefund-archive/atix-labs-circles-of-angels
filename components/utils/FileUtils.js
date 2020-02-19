import blobToBuffer from 'blob-to-buffer';

export const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

export const toBuffer = file =>
  new Promise((resolve, reject) => {
    blobToBuffer(file, (err, buffer) => {
      if (err) {
        reject(err);
      }
      resolve(buffer);
    });
  });
