export interface Game {
	id: number;
	slug: string;
	name: string;
	background_image: string;
	rating_top: number;
}

export interface GameQuery {
	search?: string | null;
	genres?: Genre | null;
	tags?: string | null;
	platforms?: Platform | null;
}

export interface Genre {
	id: number;
	name: string;
	slug: string;
	game_count: number;
	image_background: string;
}

export interface Platform {
	id: number;
	name: string;
	slug: string;
}
