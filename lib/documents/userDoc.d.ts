import { BaseDoc } from "./baseDoc";

export interface UserDoc extends BaseDoc {
	username: string;
	settings: Settings;
}

export interface Settings {
  aggressivePreloading?: boolean;
  wildWasteland?: boolean;
  undoLimit?: number;
  debug?: boolean;
}