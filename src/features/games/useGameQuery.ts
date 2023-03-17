import { create } from 'zustand';

import { GameQuery } from './games';

export interface GameQueryState {
	gameQuery: GameQuery;
	updateGameQuery: (gameQuery: GameQuery) => void;
}

const useGameQuery = create<GameQueryState>()((set) => ({
	gameQuery: {} as GameQuery,
	updateGameQuery: (newGameQuery) =>
		set((state) => ({ gameQuery: { ...state.gameQuery, ...newGameQuery } })),
}));

export default useGameQuery;
