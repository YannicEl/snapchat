import { initializeApp } from 'firebase-admin/app';
import { getStorage as _getStorage } from 'firebase-admin/storage';
import { getFirestore as _getFirestore } from 'firebase-admin/firestore';
import { logger } from 'firebase-functions';

// this is not working. Why?
let init = false;

export const getStorage = () => {
  initApp();
  return _getStorage();
};

export const getFirestore = () => {
  initApp();
  return _getFirestore();
};

const initApp = (): void => {
  if (init) return;
  logger.log('init app');
  initializeApp();
  init = true;
};
