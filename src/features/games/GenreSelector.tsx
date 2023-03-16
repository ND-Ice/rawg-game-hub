import Image from 'next/image';
import {
	Box,
	Button,
	List,
	ListItem,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';

import client from '@/config/client';
import { Genre } from './games';

interface GenreResponse {
	count: number;
	next: string;
	prev: string;
	results: Genre[];
}

interface Props {
	selectedGenre?: Genre | null;
	onSelectGenre: (genre: Genre) => void;
}

const GenreSelector = ({ selectedGenre, onSelectGenre }: Props) => {
	const { data } = useQuery<GenreResponse, Error>({
		queryKey: ['genres'],
		queryFn: () =>
			client
				.get('/genres')
				.then(({ data }) => data)
				.catch((err) => err),
	});

	const activeColor = useColorModeValue('blackAlpha.800', 'white');
	const inactiveColor = useColorModeValue('blackAlpha.600', 'gray.400');

	return (
		<List>
			{data?.results?.map((genre) => (
				<ListItem key={genre.id} paddingY={2}>
					<Button gap={5} variant='link' onClick={() => onSelectGenre(genre)}>
						<Box pos='relative' boxSize={10} rounded='xl' overflow='hidden'>
							<Image src={genre.image_background} alt='Genre Image' fill />
						</Box>
						<Text
							fontSize='lg'
							fontWeight={
								selectedGenre?.id === genre.id ? 'extrabold' : 'medium'
							}
							color={
								selectedGenre?.id === genre.id ? activeColor : inactiveColor
							}
						>
							{genre.name}
						</Text>
					</Button>
				</ListItem>
			))}
		</List>
	);
};

export default GenreSelector;
