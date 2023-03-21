import { Grid, GridItem, SimpleGrid } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import client from '@/config/client';
import { Developer } from '@/features/developers/developer';
import { Game } from '@/features/games/games';
import GameCard from '@/features/games/GameCard';

interface FetchGamesResponse {
	count: number;
	next: string;
	results: Game[];
}

const GameDeveloperDetails = () => {
	const router = useRouter();
	const { developerId } = router.query;

	const { data: developerDetails } = useQuery<Developer, Error>({
		queryKey: ['developers', developerId],
		queryFn: () =>
			client
				.get(`/developers/${developerId}`)
				.then(({ data }) => data)
				.catch((err) => err),
		enabled: Boolean(developerId),
	});

	const { data: developerGames } = useQuery<FetchGamesResponse, Error, Game[]>({
		queryKey: ['developer-games', developerId],
		queryFn: () =>
			client
				.get('/games', { params: { developers: developerId } })
				.then(({ data }) => data)
				.catch((err) => err),
		select: (data) => data.results,
		enabled: Boolean(developerId),
	});

	const handleSelectGame = (game: Game) => router.push(`/games/${game.id}`);

	return (
		<Grid p={5} templateColumns={{ base: '1fr', lg: '300px 1fr' }}>
			<GridItem></GridItem>
			<GridItem>
				<SimpleGrid gap={5} columns={{ base: 1, md: 2, lg: 3 }}>
					{developerGames?.map((developerGame) => (
						<GameCard
							key={developerGame.id}
							game={developerGame}
							onSelectGame={handleSelectGame}
						/>
					))}
				</SimpleGrid>
			</GridItem>
		</Grid>
	);
};

export default GameDeveloperDetails;
