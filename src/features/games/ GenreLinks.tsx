import Image from 'next/image';
import { Box, Button, Heading, List, ListItem, Stack } from '@chakra-ui/react';

import getImageURL from '@/utils/getImageURL';
import { Genre } from './games';

interface Props {
	genres: Genre[];
}

const GenreLinks = ({ genres }: Props) => {
	return (
		<Stack mt={10}>
			<Heading size='lg' color='gray.500'>
				Genres
			</Heading>
			<List>
				{genres?.map((genre) => (
					<ListItem key={genre.id} mt={2}>
						<Button variant='link'>
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