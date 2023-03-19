import Image from 'next/image';
import {
	Box,
	Button,
	Grid,
	GridItem,
	Heading,
	List,
	ListItem,
	Spinner,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import client from '@/config/client';
import { Game } from '@/features/games/games';
import PlatformLinks from '@/features/games/PlatformLinks';
import getImageURL from '@/utils/getImageURL';
import GenreLinks from '@/features/games/ GenreLinks';

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

	const descriptionWithoutTags = gameDetails?.description.replace(
		/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
		''
	);

	return (
		<Box p={5}>
			{isLoading && <Spinner />}
			{!isLoading && (
				<Grid gap={10} templateColumns={{ base: '1fr', lg: '1fr 300px' }}>
					<GridItem>
						<Box pos='relative' w='100%' h={300} rounded='lg' overflow='hidden'>
							<Image
								style={{ objectFit: 'cover' }}
								fill
								sizes='100%'
								src={getImageURL(gameDetails?.background_image)}
								alt='Game Image'
								priority
							/>
						</Box>
						<Heading mt={10} size='lg' mb={5}>
							{gameDetails?.name}
						</Heading>
						<Text align='justify'>{descriptionWithoutTags}</Text>
					</GridItem>
					<GridItem>
						{gameDetails?.genres.length && (
							<GenreLinks genres={gameDetails?.genres} />
						)}
						{gameDetails?.platforms?.length && (
							<PlatformLinks
								platforms={gameDetails?.platforms.map(
									({ platform }) => platform
								)}
							/>
						)}
					</GridItem>
				</Grid>
			)}
		</Box>
	);
};

export default GameDetails;
