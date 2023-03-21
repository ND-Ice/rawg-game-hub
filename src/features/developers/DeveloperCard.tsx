import Image from 'next/image';
import { Box, Card, Heading } from '@chakra-ui/react';
import { Developer } from './developer';

interface Props {
	developer: Developer;
}

const DeveloperCard = ({ developer }: Props) => {
	return (
		<Card>
			<Box pos='relative' h={200}>
				<Image
					fill
					style={{ objectFit: 'cover' }}
					src={developer.image_background}
					alt='Developer Image'
				/>
			</Box>
			<Heading>{developer.name}</Heading>
		</Card>
	);
};

export default DeveloperCard;
