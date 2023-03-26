import Image from 'next/image';
import { Badge, Box, Card, CardBody, Heading, HStack } from '@chakra-ui/react';

import getImageURL from '@/utils/getImageURL';
import { GameStore } from './game-store';

interface Props {
	gameStore: GameStore;
	onSelectStore: (gameStore: GameStore) => void;
}

const GameStoreCard = ({ gameStore, onSelectStore }: Props) => {
	return (
		<Card
			overflow='hidden'
			cursor='pointer'
			onClick={() => onSelectStore(gameStore)}
		>
			<Box pos='relative' h={200}>
				<Image
					fill
					sizes='100%'
					style={{ objectFit: 'cover' }}
					src={getImageURL(gameStore?.image_background)}
					alt='Game Store Image'
					placeholder='blur'
					blurDataURL='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
				/>
			</Box>
			<CardBody>
				<HStack justify='space-between'>
					<Heading size='md'>{gameStore?.name}</Heading>
					<Badge>{gameStore?.games_count}</Badge>
				</HStack>
			</CardBody>
		</Card>
	);
};

export default GameStoreCard;
