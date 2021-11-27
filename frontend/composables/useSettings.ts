import { Settings } from 'lib/documents/userDoc';

const defaultSettings: Settings = {
  aggressivePreloading: false,
  wildWasteland: false,
  undoLimit: 5,
  debug: false,
};

const settings = useStorage('settings', defaultSettings);

export const useSettings = () => {
  return settings;
};
