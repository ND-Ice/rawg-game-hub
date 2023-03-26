import Image from 'next/image';
import { Box, Button, Heading, List, ListItem, Stack } from '@chakra-ui/react';

import { Genre } from './games';
import getImageURL from '@/utils/getImageURL';
import { useRouter } from 'next/router';
import useGameQuery from './useGameQuery';

interface Props {
	genres: Genre[] | undefined;
}

const GenreLinks = ({ genres }: Props) => {
	const router = useRouter();
	const { updateGameQuery } = useGameQuery();

	const handleLinkClicked = (genre: Genre) => {
		updateGameQuery({ genres: genre });
		router.push('/');
	};

	if (!genres?.length) return null;

	return (
		<Stack>
			<Heading size='lg' color='gray.500'>
				Genres
			</Heading>
			<List>
				{genres?.map((genre) => (
					<ListItem key={genre.id} mt={2}>
						<Button variant='link' onClick={() => handleLinkClicked(genre)}>
							<Box
								pos='relative'
								rounded='lg'
								mr={5}
								boxSize={30}
								overflow='hidden'
							>
								<Image
									fill
									src={getImageURL(genre.image_background)}
									alt='Genre Image'
									style={{ objectFit: 'cover' }}
									sizes='100%'
									placeholder='blur'
									blurDataURL='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
								/>
							</Box>
							{genre.name}
						</Button>
					</ListItem>
				))}
			</List>
		</Stack>
	);
};

export default GenreLinks;
