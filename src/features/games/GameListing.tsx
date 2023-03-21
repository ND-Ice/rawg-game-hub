import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { Heading, HStack, SimpleGrid } from '@chakra-ui/react';

import client from '@/config/client';
import { Game } from './games';
import GameCard from './GameCard';
import GameCardLoading from './GameCardLoading';
import useGameQuery from './useGameQuery';
import PlatformSelector from './PlatformSelector';

interface GameResponse {
	count: number;
	next: string;
	results: Game[];
}

const GameListing = () => {
	const router = useRouter();
	const {
		gameQuery: { genres, platforms },
		updateGameQuery,
	} = useGameQuery();

	const { data, isLoading } = useQuery<GameResponse, Error>({
		queryKey: ['games', genres?.id, platforms?.id],
		queryFn: () =>
			client
				.get('/games', {
					params: { genres: genres?.id, platforms: platforms?.id },
				})
				.then(({ data }) => data)
				.catch((err) => err),
	});

	const dynamicHeading: string = `${platforms?.name || ''} ${
		genres?.name || ''
	} Games`;

	const handleSelectGame = (game: Game) => router.push(`/games/${game.id}`);

	if (isLoading)
		return (
			<SimpleGrid gap={5} columns={{ base: 1, md: 2, lg: 3 }}>
				{isLoading &&
					[...Array(10).keys()].map((e) => <GameCardLoading key={e} />)}
			</SimpleGrid>
		);

	return (
		<>
			<HStack justify='space-between' mb={5}>
				<Heading size='lg'>{dynamicHeading}</Heading>
				<PlatformSelector
					selectedPlatform={platforms}
					onSelectPlatform={(platform) =>
						updateGameQuery({ platforms: platform })
					}
				/>
			</HStack>
			<SimpleGrid gap={5} columns={{ base: 1, md: 2, lg: 3 }}>
				{data?.results?.map((game) => (
					<GameCard game={game} key={game.id} onSelectGame={handleSelectGame} />
				))}
			</SimpleGrid>
		</>
	);
};

export default GameListing;
