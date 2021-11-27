export interface BaseDoc {
	createdAt: Timestamp;
	updatedAt: Timestamp;
}

export interface Timestamp {
	toDate(): Date;
	toMillis(): number;
}
