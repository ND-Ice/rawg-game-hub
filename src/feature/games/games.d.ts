export interface Game {
	id: number;
	slug: string;
	name: string;
	background_image: string;
	rating_top: number;
}

export interface GameQuery {
	search?: string | null;
	genre?: Genre | null;
	tags?: string | null;
}

export interface Genre {
	id: number;
	name: string;
	slug: string;
	game_count: number;
	image_background: string;
}
