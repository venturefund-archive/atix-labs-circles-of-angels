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

export const downloadFileFromPath = (filePath, filename) => {
  const link = document.createElement('a');
  link.href = filePath;
  link.rel = 'noopener noreferrer';
  link.target = '_blank';
  if (filename) {
    link.setAttribute('download', filename);
  }
  document.body.appendChild(link);
  link.click();
  link.remove();
};
