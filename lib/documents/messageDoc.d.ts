import { BaseDoc } from './baseDoc';

export interface MessageDoc extends BaseDoc {
	sender: Sender;
	processed: boolean;
	formats: {
		png: boolean;
		avif: boolean;
		webp: boolean;
	};
}

export interface Sender {
	id: string;
	name: string;
}
