import Image from 'next/image';
import { Box, Card, CardBody, Heading } from '@chakra-ui/react';

import { Game } from './games';

interface Props {
	game: Game;
}

const GameCard = ({ game }: Props) => {
	return (
		<Card>
			<Box pos='relative' w='full' h='250px' rounded='lg' overflow='hidden'>
				<Image
					src={game.background_image}
					style={{ objectFit: 'cover' }}
					fill
					sizes='100%'
					alt='Game Image'
				/>
			</Box>
			<CardBody>
				<Heading size='md'>{game.name}</Heading>
			</CardBody>
		</Card>
	);
};

export default GameCard;
