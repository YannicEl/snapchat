import { BaseDoc } from './baseDoc';

export interface MessageDoc extends BaseDoc {
	sender: Sender;
	processed: boolean;
	formats: Formats;
}

export interface Sender {
	id: string;
	name: string;
}

export interface Formats {
	png: boolean;
	avif: boolean;
	webp: boolean;
}
