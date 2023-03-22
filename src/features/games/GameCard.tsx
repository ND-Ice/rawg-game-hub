import Image from 'next/image';
import { Box, Card, CardBody, Heading } from '@chakra-ui/react';

import { Game } from './games';
import PlatformIconList from './PlatformIconList';
import getImageURL from '@/utils/getImageURL';

interface Props {
	game: Game;
	onSelectGame: (game: Game) => void;
}

const GameCard = ({ game, onSelectGame }: Props) => {
	return (
		<Card
			overflow='hidden'
			as='button'
			h='max'
			onClick={() => onSelectGame(game)}
		>
			<Box pos='relative' w='full' h='250px'>
				<Image
					src={getImageURL(game.background_image)}
					style={{ objectFit: 'cover' }}
					fill
					sizes='100%'
					alt='Game Image'
				/>
			</Box>
			<CardBody>
				<Heading textAlign='left' size='md' mb={5}>
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
