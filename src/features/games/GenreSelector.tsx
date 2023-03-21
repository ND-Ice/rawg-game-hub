import Image from 'next/image';
import {
	Box,
	Button,
	Heading,
	List,
	ListItem,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';
import { useQuery } from 'react-query';

import client from '@/config/client';
import { Genre } from './games';
import GenreSekeleton from './GenreSekeleton';

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
	const { data: genres, isLoading } = useQuery<GenreResponse, Error, Genre[]>({
		queryKey: ['genres'],
		queryFn: () =>
			client
				.get('/genres')
				.then(({ data }) => data)
				.catch((err) => err),
		select: (data) => data.results,
	});

	const activeColor = useColorModeValue('blackAlpha.800', 'white');
	const inactiveColor = useColorModeValue('blackAlpha.600', 'gray.400');

	if (isLoading)
		return (
			<>
				{[...Array(20).keys()].map((el) => (
					<GenreSekeleton key={el} />
				))}
			</>
		);

	return (
		<>
			<Heading size='lg' mb={5} color='gray.500'>
				Genres
			</Heading>
			<List>
				{genres?.map((genre) => (
					<ListItem key={genre.id} paddingY={1}>
						<Button gap={5} variant='link' onClick={() => onSelectGenre(genre)}>
							<Box pos='relative' boxSize={10} rounded='xl' overflow='hidden'>
								<Image
									src={genre.image_background}
									sizes='100%'
									alt='Genre Image'
									fill
								/>
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
		</>
	);
};

export default GenreSelector;
