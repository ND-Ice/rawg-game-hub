import { useQuery } from 'react-query';
import { Heading, SimpleGrid } from '@chakra-ui/react';

import client from '@/config/client';
import { Game } from './games';
import GameCard from './GameCard';
import GameCardLoading from './GameCardLoading';
import useGameQuery from './useGameQuery';

interface GameResponse {
	count: number;
	next: string;
	results: Game[];
}

const GameListing = () => {
	const {
		gameQuery: { genre },
	} = useGameQuery();

	const { data, isLoading } = useQuery<GameResponse, Error>({
		queryKey: ['games', genre?.slug],
		queryFn: () =>
			client
				.get('/games', { params: { genres: genre?.slug } })
				.then(({ data }) => data)
				.catch((err) => err),
	});

	const dynamicHeading: string = `${genre?.name || ''} Games`;

	return (
		<>
			<Heading size='lg' mb={5}>
				{dynamicHeading}
			</Heading>
			<SimpleGrid gap={5} columns={{ base: 1, md: 2, lg: 3 }}>
				{isLoading &&
					[...Array(10).keys()].map((e) => <GameCardLoading key={e} />)}

				{data?.results?.map((game) => (
					<GameCard game={game} key={game.id} />
				))}
			</SimpleGrid>
		</>
	);
};

export default GameListing;
