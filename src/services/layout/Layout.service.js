import mockdata from '../../mockdata.json';

export const getHeader = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockdata['header']);
    }, 1000);
  });
};

export const getFooter = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockdata["footer"]);
    }, 1000);
  });
};
