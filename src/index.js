export PublicUploader from './PublicUploader';

let apiService;

export function init(options = {}) {
  apiService = options.apiService;
}

export function getApiService() {
  if (!apiService) {
    const needInitializationWarning = 'You should initialize me-uploader module with API service instance.\nCall `init({ apiService });` in the initialization phase in your app.';
    console.error(needInitializationWarning);
    throw new Error(needInitializationWarning);
  }
  return apiService;
}
