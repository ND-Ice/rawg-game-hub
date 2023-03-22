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
	SimpleGrid,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { BsLink, BsPlay, BsStarFill } from 'react-icons/bs';

import { Game, GameScreenShot } from '@/features/games/games';
import client from '@/config/client';
import PlatformLinks from '@/features/games/PlatformLinks';
import getImageURL from '@/utils/getImageURL';
import GenreLinks from '@/features/games/ GenreLinks';
import GameScreenshots from '@/features/games/GameScreenshots';
import getRatingColor from '@/features/games/getRatingColor';
import PlatformIconList from '@/features/games/PlatformIconList';
import GameCardLoading from '@/features/games/GameCardLoading';

interface GameScreenShotsResponse {
	next: string | null;
	previous: string | null;
	results: GameScreenShot[];
}

const GameDetails = () => {
	const router = useRouter();
	const { gameId } = router.query;

	const { data: gameDetails, isLoading } = useQuery<Game, Error>({
		queryKey: ['games', gameId],
		queryFn: () =>
			client
				.get(`/games/${gameId}`)
				.then(({ data }) => data)
				.catch((err) => err),
	});

	const { data: gameScreenshots } = useQuery<
		GameScreenShotsResponse,
		Error,
		GameScreenShot[]
	>({
		queryKey: ['game-screen-shots', gameId],
		queryFn: () =>
			client
				.get(`/games/${gameId}/screenshots`)
				.then(({ data }) => data)
				.catch((err) => err),
		select: (data) => data.results,
	});

	if (isLoading)
		return (
			<SimpleGrid p={5} gap={5} columns={{ base: 1, md: 2, lg: 3, xl: 4 }}>
				{[...Array(10).keys()].map((e) => (
					<GameCardLoading key={e} />
				))}
			</SimpleGrid>
		);

	return (
		<Box p={5}>
			{isLoading && <Spinner />}
			{!isLoading && (
				<Grid
					gap={{ base: 10, lg: 20 }}
					templateColumns={{ base: '1fr', lg: '1fr 300px' }}
				>
					<GridItem>
						<Box pos='relative' w='100%' h={350} rounded='lg' overflow='hidden'>
							<Image
								style={{ objectFit: 'cover' }}
								fill
								sizes='100%'
								src={getImageURL(gameDetails?.background_image)}
								alt='Game Image'
								priority
							/>
						</Box>
						<Box mb={5}>
							<HStack align='center' mt={10} justify='space-between'>
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
									href={gameDetails?.website!}
									target='_blank'
									rel='noopener noreferrer'
								>
									<Button size='xs' leftIcon={<BsLink />}>
										See More
									</Button>
								</Link>
							</HStack>
						</Box>
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
			)}
		</Box>
	);
};

export default GameDetails;
