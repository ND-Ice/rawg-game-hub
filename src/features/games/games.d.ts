export interface Game {
	id: number;
	slug: string;
	name: string;
	description: string;
	released: string;
	background_image: string;
	background_image_addional: string;
	website: string;
	rating_top: number;
	playtime: number;
	parent_platforms: { platform: Platform }[];
	platforms: { platform: Platform }[];
	genres: Genre[];
	esrb_rating: EsrbRating | null;
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
	image_background: string;
}

export interface GameScreenshot {
	id: number;
	image: string;
	hidden: boolean;
	width: number;
	height: number;
}

export interface EsrbRating {
	id: number;
	slug: string;
	name: string;
}

export interface GameTrailer {
	id: number;
	name: string;
	preview: string;
	data: { 480: string; max: string };
}
