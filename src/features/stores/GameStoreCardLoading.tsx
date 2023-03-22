import { Card, CardBody, HStack, Skeleton } from '@chakra-ui/react';

const GameStoreCardLoading = () => {
	return (
		<Card rounded='lg' overflow='hidden'>
			<Skeleton h={200} />
			<CardBody>
				<HStack gap={5} justify='space-between'>
					<Skeleton h={8} w='full' rounded='lg' />
					<Skeleton boxSize={8} rounded='lg' />
				</HStack>
			</CardBody>
		</Card>
	);
};

export default GameStoreCardLoading;
