const info = (...params: string[]) => {
  console.log(...params);
};

const error = (...params: (string | Error)[]) => {
  console.error(...params);
};
export default { info, error };
