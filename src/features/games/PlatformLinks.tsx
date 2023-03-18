import Image from 'next/image';
import { Box, Button, Heading, List, ListItem, Stack } from '@chakra-ui/react';

import { Platform } from './games';

interface Props {
	platforms: Platform[];
}

const PlatformLinks = ({ platforms }: Props) => {
	return (
		<Stack mt={5}>
			<Heading size='lg' color='gray.500'>
				Platforms
			</Heading>
			<List>
				{platforms?.map((platform) => (
					<ListItem key={platform.id} mt={2}>
						<Button variant='link'>
							<Box
								mr={5}
								pos='relative'
								boxSize={30}
								rounded='lg'
								overflow='hidden'
							>
								<Image
									style={{ objectFit: 'cover' }}
									src={platform.image_background}
									alt='Platform Image'
									fill
									sizes='100%'
								/>
							</Box>
							{platform.name}
						</Button>
					</ListItem>
				))}
			</List>
		</Stack>
	);
};

export default PlatformLinks;
