import { create } from 'zustand';

import { GameQuery } from './games';

export interface GameQueryState<T> {
	gameQuery: T;
	updateGameQuery: (gameQuery: T) => void;
}

const useGameQuery = create<GameQueryState<GameQuery>>()((set) => ({
	gameQuery: {} as GameQuery,
	updateGameQuery: (newGameQuery) =>
		set((state) => ({ gameQuery: { ...state.gameQuery, ...newGameQuery } })),
}));

export default useGameQuery;
