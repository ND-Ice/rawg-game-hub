import Image from 'next/image';
import { Box, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';

import { Game } from './games';

interface Props {
	gameDetails: Game;
}
const SearchItem = ({ gameDetails }: Props) => {
	return (
		<Flex
			gap={5}
			p={2}
			rounded='lg'
			cursor='pointer'
			transition='all 200ms ease'
			_hover={{ background: useColorModeValue('gray.100', 'gray.800') }}
		>
			<Box pos='relative' boxSize={50} rounded='lg' overflow='hidden'>
				<Image
					fill
					style={{ objectFit: 'cover' }}
					src={gameDetails.background_image}
					alt='Game Image'
				/>
			</Box>
			<Box>
				<Heading size='sm' fontWeight='medium'>
					{gameDetails.name}
				</Heading>
				<Text>{gameDetails.slug}</Text>
			</Box>
		</Flex>
	);
};

export default SearchItem;
