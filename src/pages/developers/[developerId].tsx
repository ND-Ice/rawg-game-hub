import Image from 'next/image';
import {
	Box,
	Grid,
	GridItem,
	Heading,
	SimpleGrid,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import client from '@/config/client';
import getImageURL from '@/utils/getImageURL';
import { Developer } from '@/features/developers/developer';
import { Game } from '@/features/games/games';
import getDeveloperDescription from '@/features/developers/getDeveloperDescription';

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
		<Stack p={5} gap={5}>
			<Grid gap={5} templateColumns={{ base: '1fr', lg: '300px 1fr' }}>
				<GridItem>
					<Box
						minH={300}
						maxH={400}
						pos='relative'
						w='full'
						h='full'
						rounded='lg'
						overflow='hidden'
					>
						<Image
							fill
							sizes='100%'
							style={{ objectFit: 'cover' }}
							src={getImageURL(developerDetails?.image_background)}
							alt='Developer Logo'
						/>
					</Box>
				</GridItem>
				<GridItem>
					<Heading>{developerDetails?.name}</Heading>
					<Grid
						mt={5}
						gap={5}
						textAlign='justify'
						dangerouslySetInnerHTML={{
							__html: getDeveloperDescription(developerDetails?.description),
						}}
					/>
				</GridItem>
			</Grid>
			<Stack>
				<Heading size='lg' color='gray.400' mb={5}>
					Published Games ({developerDetails?.games_count || 0})
				</Heading>
				<SimpleGrid gap={5} columns={{ base: 1, md: 2, lg: 3, xl: 4 }}>
					{developerGames?.map((developerGame) => (
						<GameCard
							key={developerGame.id}
							game={developerGame}
							onSelectGame={handleSelectGame}
						/>
					))}
				</SimpleGrid>
			</Stack>
		</Stack>
	);
};

export default GameDeveloperDetails;
