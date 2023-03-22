export interface GameStore {
	id: number;
	name: string;
	domain: string | null;
	slug: string;
	games_count: number;
	image_background: string;
	description: string;
}
