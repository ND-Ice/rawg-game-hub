import Image from 'next/image';
import Link from 'next/link';
import {
	Box,
	Button,
	Grid,
	GridItem,
	Heading,
	HStack,
	SimpleGrid,
} from '@chakra-ui/react';
import { FaLink } from 'react-icons/fa';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import client from '@/config/client';
import { Game } from '@/features/games/games';
import { GameStore } from '@/features/stores/game-store';
import getDescription from '@/utils/getDescription';
import getImageURL from '@/utils/getImageURL';
import GameCard from '@/features/games/GameCard';
import GameCardLoading from '@/features/games/GameCardLoading';

interface FetchedGamesResponse {
	count: number;
	next: string;
	results: Game[];
}

const StoreDetails = () => {
	const router = useRouter();
	const { storeId } = router.query;

	const { data: storeDetails, isLoading: isFetchingGameStoreDetails } =
		useQuery<GameStore, Error>({
			queryKey: ['store', storeId],
			queryFn: () =>
				client
					.get(`/stores/${storeId}`)
					.then(({ data }) => data)
					.catch((err) => err),
		});

	const { data: games, isLoading: isFetchingGames } = useQuery<
		FetchedGamesResponse,
		Error,
		Game[]
	>({
		queryKey: ['games', storeId],
		queryFn: () =>
			client
				.get('/games', {
					params: { stores: storeId },
				})
				.then(({ data }) => data)
				.catch((err) => err),
		select: (data) => data.results,
	});

	const storeGamesHeading = `${storeDetails?.name || ''} Games (${
		storeDetails?.games_count || 0
	})`;

	const handleSelectGame = (game: Game) => router.push(`/games/${game?.id}`);

	if (isFetchingGameStoreDetails || isFetchingGames)
		return (
			<SimpleGrid p={5} gap={5} columns={{ base: 1, md: 2, lg: 3, xl: 4 }}>
				{[...Array(10).keys()].map((e) => (
					<GameCardLoading key={e} />
				))}
			</SimpleGrid>
		);

	return (
		<Box p={5}>
			<Grid
				gap={{ base: 5, lg: 10 }}
				templateColumns={{ base: '1fr', lg: '300px 1fr' }}
			>
				<GridItem>
					<Box
						minH={200}
						h='full'
						maxH={400}
						pos='relative'
						overflow='hidden'
						rounded='lg'
					>
						<Image
							fill
							style={{ objectFit: 'cover' }}
							src={getImageURL(storeDetails?.image_background)}
							alt='Store Banner'
						/>
					</Box>
				</GridItem>
				<GridItem>
					<HStack justify='space-between'>
						<Heading size='lg'>{storeDetails?.name}</Heading>
						<Link
							href={`https://${storeDetails?.domain}`}
							rel='noopener noreferrer'
							target='_blank'
						>
							<Button size='sm' leftIcon={<FaLink />}>
								Visit Page
							</Button>
						</Link>
					</HStack>
					<Grid
						gap={5}
						mt={5}
						textAlign='justify'
						dangerouslySetInnerHTML={{
							__html: getDescription(storeDetails?.description),
						}}
					/>
				</GridItem>
			</Grid>
			<Box mt={{ base: 5, lg: 10 }}>
				<Heading mb={10}>{storeGamesHeading}</Heading>

				<ResponsiveMasonry
					columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1280: 4 }}
				>
					<Masonry gutter='20px'>
						{games?.map((game) => (
							<GameCard
								game={game}
								key={game.id}
								onSelectGame={handleSelectGame}
							/>
						))}
					</Masonry>
				</ResponsiveMasonry>
			</Box>
		</Box>
	);
};

export default StoreDetails;
