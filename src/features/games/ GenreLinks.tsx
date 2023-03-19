import Image from 'next/image';
import { Box, Button, Heading, List, ListItem, Stack } from '@chakra-ui/react';

import { Genre } from './games';
import getImageURL from '@/utils/getImageURL';

interface Props {
	genres: Genre[];
}

const GenreLinks = ({ genres }: Props) => {
	return (
		<Stack>
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
