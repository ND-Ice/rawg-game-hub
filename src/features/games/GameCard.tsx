import Image from 'next/image';
import { Box, Card, CardBody, Heading } from '@chakra-ui/react';

import { Game } from './games';
import PlatformIconList from './PlatformIconList';

interface Props {
	game: Game;
}

const iconLookupMap = {};

const GameCard = ({ game }: Props) => {
	return (
		<Card overflow='hidden'>
			<Box pos='relative' w='full' h='250px'>
				<Image
					src={game.background_image}
					style={{ objectFit: 'cover' }}
					fill
					sizes='100%'
					alt='Game Image'
				/>
			</Box>
			<CardBody>
				<Heading size='md' mb={5}>
					{game.name}
				</Heading>
				<PlatformIconList
					platforms={game.parent_platforms.map(({ platform }) => platform)}
				/>
			</CardBody>
		</Card>
	);
};

export default GameCard;
