import { initializeApp } from 'firebase-admin/app';
import { getStorage as _getStorage } from 'firebase-admin/storage';
import { logger } from 'firebase-functions';

let init = false;

export const getStorage = () => {
  if (!init) {
    initApp();
  }

  return _getStorage();
};

const initApp = (): void => {
  logger.log('init app');
  initializeApp();
  init = true;
};
