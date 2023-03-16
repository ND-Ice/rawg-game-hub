import { useQuery } from 'react-query';
import { SimpleGrid } from '@chakra-ui/react';

import client from '@/config/client';
import { Game } from './games';
import GameCard from './GameCard';

interface GameResponse {
	data: { count: number; next: string; results: Game[] };
}

const GameListing = () => {
	const { data } = useQuery<GameResponse, Error>({
		queryKey: ['games'],
		queryFn: () =>
			client
				.get('/games')
				.then((data) => data)
				.catch((err) => err),
	});

	return (
		<SimpleGrid gap={5} columns={{ base: 1, md: 2, lg: 3 }}>
			{data?.data?.results?.map((game) => (
				<GameCard game={game} key={game.id} />
			))}
		</SimpleGrid>
	);
};

export default GameListing;
