import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box, Button, Heading, List, ListItem, Stack } from '@chakra-ui/react';

import { Platform } from './games';
import useGameQuery from './useGameQuery';

interface Props {
	platforms: Platform[] | undefined;
}

const PlatformLinks = ({ platforms }: Props) => {
	const router = useRouter();
	const { updateGameQuery } = useGameQuery();

	const handleLinkClicked = (platform: Platform) => {
		updateGameQuery({ platforms: platform });
		router.push('/');
	};

	if (!platforms?.length) return null;

	return (
		<Stack mt={5}>
			<Heading size='lg' color='gray.500'>
				Platforms
			</Heading>
			<List>
				{platforms?.map((platform) => (
					<ListItem key={platform.id} mt={2}>
						<Button variant='link' onClick={() => handleLinkClicked(platform)}>
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
