import { Settings } from '~~/types/User';

const defaultSettings: Settings = {
  aggressivePreloading: false,
  wildWasterlandMode: false,
  undoLimit: 5,
  debug: false,
};

const settings = useStorage('settings', defaultSettings);

export const useSettings = () => {
  return settings;
};
