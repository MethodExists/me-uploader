import service from '~/service';

/*
 service needs to have:
 fetch()
 update(record)
*/

export default {
  namespace: 'files',
  state: {
    singleFiles: {
      // [path]: { [filename]: { status, url, id } }
    },
  },
  reducers: {
    save(state, { payload: { path, response } }) {
      return {
        ...state,
        [path]: response || {},
      };
    },

    initSingleFile(state, { payload: { filename, path } }) {
      return {
        ...state,
        singleFiles: {
          ...state.singleFiles,
          [path]: {
            ...state.singleFiles[path] || {},
            [filename]: {
              status: 'pending',
            },
          },
        },
      };
    },

    updateFile(state, { payload: { filename, path, id, url } }) {
      return {
        ...state,
        singleFiles: {
          ...state.singleFiles,
          [`${path}/${filename}`]: {
            status: 'uploaded',
            id,
            url,
          },
        },
      };
    },

  },
  effects: {
    *fetch({ payload: { path, resolve, reject } }, { call, put }) {
      try {
        const response = yield call(service.fetch, {
          path,
          filters: {
            path,
          },
        });
        yield put({ type: 'save', payload: { path, response } });
        resolve(response);
      } catch (e) {
        throw new Error(e);
      }
    },
    *fetchOne({ payload: { id, resolve, reject } }, { call }) {
      try {
        const response = yield call(service.fetchOne, { id });
        // yield put({ type: 'save', payload: { path, response } });
        resolve(response);
      } catch (e) {
        throw new Error(e);
      }
    },
    *upload({ payload: { filename, path, isPublic, resolve, reject } }, { call }) {
      try {
        const response = yield call(service.upload, { filename, path, isPublic });
        resolve(response);
      } catch (e) {
        reject(e);
      }
    },
    *uploadSingle({ payload: { file, path, isPublic, customUrl, resolve, reject } },
      { call, put }) {
      try {
        yield put({ type: 'initSingleFile', payload: { path, filename: file.name } });
        const response = yield call(service.upload, {
          filename: file.name, path, isPublic, customUrl,
        });
        yield call(service.xhrRequest, { url: response.url, file, method: 'PUT' });
        const fileResponse = yield call(service.fetchOne, { id: response.id });
        yield put({
          type: 'updateFile',
          payload: {
            path,
            filename: file.name,
            id: response.id,
            url: response.url,
          },
        });
        resolve(fileResponse);
      } catch (e) {
        reject(e);
      }
    },
    *delete({ payload: { id, resolve, reject } }, { call }) {
      try {
        const response = yield call(service.del, { id });
        resolve(response);
      } catch (e) {
        reject(e);
      }
    },
    *handleSignedRequest({ payload: { url, file, method, resolve, reject } }, { call }) {
      try {
        yield call(service.xhrRequest, { url, file, method });
        resolve();
      } catch (e) {
        reject(e);
      }
    },
  },
};
