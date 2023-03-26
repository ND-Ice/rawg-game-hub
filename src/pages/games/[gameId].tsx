import Link from 'next/link';
import moment from 'moment';
import Image from 'next/image';
import {
	Badge,
	Box,
	Button,
	Grid,
	GridItem,
	Heading,
	HStack,
	Show,
	SimpleGrid,
	Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { BsLink, BsPlay, BsStarFill } from 'react-icons/bs';

import { Game, GameScreenshot, GameTrailer } from '@/features/games/games';
import client from '@/config/client';
import PlatformLinks from '@/features/games/PlatformLinks';
import getImageURL from '@/utils/getImageURL';
import GenreLinks from '@/features/games/ GenreLinks';
import GameScreenshots from '@/features/games/GameScreenshots';
import getRatingColor from '@/features/games/getRatingColor';
import PlatformIconList from '@/features/games/PlatformIconList';
import GameCardLoading from '@/features/games/GameCardLoading';
import GameTrailers from '@/features/games/GameTrailers';

interface FetchedGameScreenshotsResponse {
	next: string | null;
	previous: string | null;
	results: GameScreenshot[];
}

interface FetchedGameTrailers {
	count: number;
	next: string | null;
	previous: string | null;
	results: GameTrailer[];
}

const GameDetails = () => {
	const router = useRouter();
	const { gameId } = router.query;

	const { data: gameDetails, isLoading: isFetchingGameDetails } = useQuery<
		Game,
		Error
	>({
		queryKey: ['games', gameId],
		queryFn: () =>
			client
				.get(`/games/${gameId}`)
				.then(({ data }) => data)
				.catch((err) => err),
	});

	const { data: gameScreenshots, isLoading: isFetchingGameScreenshots } =
		useQuery<FetchedGameScreenshotsResponse, Error, GameScreenshot[]>({
			queryKey: ['game-screen-shots', gameId],
			queryFn: () =>
				client
					.get(`/games/${gameId}/screenshots`)
					.then(({ data }) => data)
					.catch((err) => err),
			select: (data) => data.results,
		});

	const { data: gameTrailers, isLoading: isFetchingGameTrailers } = useQuery<
		FetchedGameTrailers,
		Error,
		GameTrailer[]
	>({
		queryKey: ['game-trailers', gameId],
		queryFn: () =>
			client
				.get(`/games/${gameId}/movies`)
				.then(({ data }) => data)
				.catch((err) => err),
		select: (data) => data.results,
	});

	if (
		isFetchingGameDetails ||
		isFetchingGameTrailers ||
		isFetchingGameScreenshots
	)
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
				templateColumns={{ base: '1fr', lg: '1fr 300px' }}
			>
				<GridItem>
					<GameTrailers
						gameTrailers={gameTrailers}
						placeholder={gameDetails?.background_image}
					/>
					<Grid
						mb={5}
						gap={10}
						mt={{ base: 5, lg: 10 }}
						gridTemplateColumns={{ base: '1fr', md: '50px 1fr' }}
					>
						<Show above='md'>
							<GridItem
								boxSize={70}
								rounded='full'
								overflow='hidden'
								pos='relative'
							>
								<Image
									fill
									style={{ objectFit: 'cover' }}
									src={getImageURL(gameDetails?.background_image)}
									alt='Game Banner'
									placeholder='blur'
									blurDataURL='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
								/>
							</GridItem>
						</Show>
						<GridItem>
							<HStack align='center' justify='space-between'>
								<Heading size='lg'>{gameDetails?.name}</Heading>
								<Button
									size='sm'
									variant='outline'
									colorScheme={getRatingColor(gameDetails?.rating_top)}
									leftIcon={<BsStarFill />}
								>
									{gameDetails?.rating_top} Stars
								</Button>
							</HStack>
							<HStack mt={2}>
								{gameDetails?.released && (
									<Text fontSize='sm' fontWeight='medium'>
										{moment(gameDetails?.released).format('LL')}
									</Text>
								)}
								<Button size='xs' leftIcon={<BsPlay />}>
									{gameDetails?.playtime} Hours
								</Button>
								<Link
									href={gameDetails?.website || ''}
									target='_blank'
									rel='noopener noreferrer'
								>
									<Button size='xs' leftIcon={<BsLink />}>
										See More
									</Button>
								</Link>
							</HStack>
						</GridItem>
					</Grid>
					<HStack justify='space-between'>
						<Badge>{gameDetails?.esrb_rating?.name}</Badge>
						<PlatformIconList
							platforms={gameDetails?.parent_platforms.map(
								({ platform }) => platform
							)}
						/>
					</HStack>
					<Grid
						gap={5}
						marginTop={5}
						textAlign='justify'
						dangerouslySetInnerHTML={{
							__html: gameDetails?.description || '',
						}}
					/>
					<GameScreenshots gameScreenshots={gameScreenshots} />
				</GridItem>
				<GridItem>
					<GenreLinks genres={gameDetails?.genres} />
					<PlatformLinks
						platforms={gameDetails?.platforms.map(({ platform }) => platform)}
					/>
				</GridItem>
			</Grid>
		</Box>
	);
};

export default GameDetails;
