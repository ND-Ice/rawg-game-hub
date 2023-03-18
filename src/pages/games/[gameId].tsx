import Image from 'next/image';
import {
	Box,
	Button,
	Grid,
	GridItem,
	Heading,
	List,
	ListItem,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import client from '@/config/client';
import { Game } from '@/features/games/games';
import PlatformLinks from '@/features/games/PlatformLinks';

const GameDetails = () => {
	const router = useRouter();
	const { gameId } = router.query;

	const { data: gameDetails } = useQuery<Game, Error>({
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
			<Grid gap={10} templateColumns={{ base: '1fr', lg: '300px 1fr 300px' }}>
				<GridItem>
					<Box pos='relative' w='100%' h={400} rounded='lg' overflow='hidden'>
						<Image
							style={{ objectFit: 'cover' }}
							fill
							sizes='100%'
							src={gameDetails?.background_image!}
							alt='Game Image'
						/>
					</Box>
				</GridItem>
				<GridItem>
					<Heading size='lg' mb={5}>
						{gameDetails?.name}
					</Heading>
					<Text align='justify' maxW={{ lg: '100ch' }}>
						{descriptionWithoutTags}
					</Text>
				</GridItem>
				<GridItem>
					<Stack mt={10}>
						<Heading size='lg' color='gray.500'>
							Genres
						</Heading>
						<List>
							{gameDetails?.genres?.map((genre) => (
								<ListItem key={genre.id} mt={2}>
									<Button variant='link'>{genre.name}</Button>
								</ListItem>
							))}
						</List>
					</Stack>
					<PlatformLinks
						platforms={gameDetails?.platforms.map(({ platform }) => platform)}
					/>
				</GridItem>
			</Grid>
		</Box>
	);
};

export default GameDetails;
