import { Box, HStack, List, ListItem, Stack, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import client from '@/config/client';
import Image from 'next/image';

interface Genre {
	id: number;
	name: string;
	slug: string;
	game_count: number;
	image_background: string;
}

interface GenreResponse {
	count: number;
	next: string;
	prev: string;
	results: Genre[];
}

const GenreSelector = () => {
	const { data } = useQuery<GenreResponse, Error>({
		queryKey: ['genres'],
		queryFn: () =>
			client
				.get('/genres')
				.then(({ data }) => data)
				.catch((err) => err),
	});

	return (
		<List>
			{data?.results?.map((genre) => (
				<ListItem key={genre.id} paddingY={2}>
					<HStack>
						<Box pos='relative' boxSize={10} rounded='xl' overflow='hidden'>
							<Image src={genre.image_background} alt='Genre Image' fill />
						</Box>
						<Text fontSize='lg' fontWeight='semibold'>
							{genre.name}
						</Text>
					</HStack>
				</ListItem>
			))}
		</List>
	);
};

export default GenreSelector;
