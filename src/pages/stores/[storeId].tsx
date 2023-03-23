import {
	Box,
	Button,
	Grid,
	GridItem,
	Heading,
	HStack,
	Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';

import client from '@/config/client';
import { GameStore } from '@/features/stores/game-store';
import getDescription from '@/utils/getDescription';
import Image from 'next/image';
import getImageURL from '@/utils/getImageURL';
import { FaLink } from 'react-icons/fa';
import Link from 'next/link';

const StoreDetails = () => {
	const router = useRouter();
	const { storeId } = router.query;

	const { data: storeDetails } = useQuery<GameStore, Error>({
		queryKey: ['store', storeId],
		queryFn: () =>
			client
				.get(`/stores/${storeId}`)
				.then(({ data }) => data)
				.catch((err) => err),
	});

	console.log(storeDetails);

	return (
		<Box p={5}>
			<Grid
				gap={{ base: 5, lg: 10 }}
				templateColumns={{ base: '1fr', lg: '300px 1fr' }}
			>
				<GridItem>
					<Box
						minH={200}
						h='full'
						maxH={400}
						pos='relative'
						overflow='hidden'
						rounded='lg'
					>
						<Image
							fill
							style={{ objectFit: 'cover' }}
							src={getImageURL(storeDetails?.image_background)}
							alt='Store Banner'
						/>
					</Box>
				</GridItem>
				<GridItem>
					<HStack justify='space-between'>
						<Heading size='lg'>{storeDetails?.name}</Heading>
						<Link
							href={`https://${storeDetails?.domain}`}
							rel='noopener noreferrer'
							target='_blank'
						>
							<Button size='sm' leftIcon={<FaLink />}>
								Visit Page
							</Button>
						</Link>
					</HStack>
					<Grid
						gap={5}
						mt={5}
						textAlign='justify'
						dangerouslySetInnerHTML={{
							__html: getDescription(storeDetails?.description),
						}}
					/>
				</GridItem>
			</Grid>
		</Box>
	);
};

export default StoreDetails;
