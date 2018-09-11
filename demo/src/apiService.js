const delay = 1300;

const mocks = {
  '/filePublic': { url: '//localhost:3001/uploadedFiles/file.jpg', id: '123' },
  '/table/files/123': { url: 'uploadedFiles/file.jpg', id: '123' },
  '/ad/customUrl': { url: '//localhost:3001/customUrl', id: '123' },
};

export default {
  get: (url) => {
    return new Promise((resolve, reject) => {
      const result = mocks[url] || { error: `${url} not found` };
      if (!result) {
        reject({ message: `${url} not found` });
      }
      setTimeout(() => resolve(result), delay);
    });
  },
  put: (url) => {
    return new Promise((resolve, reject) => {
      const result = mocks[url];
      if (!result) {
        reject({ message: `${url} not found` });
      }
      setTimeout(() => resolve(result), delay);
    });
  },
  delete: () => {
    console.info('fake api delete call', arguments);
  },
};
