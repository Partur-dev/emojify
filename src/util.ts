export const random = (len: number): Uint8Array => {
  let arr = new Uint8Array(len);
  window.crypto.getRandomValues(arr);
  return arr.map((n) => n);
};
