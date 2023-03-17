import { HStack, Skeleton } from '@chakra-ui/react';

const GenreSekeleton = () => {
	return (
		<HStack mb={4} gap={2} rounded='lg' overflow='hidden'>
			<Skeleton boxSize={10} rounded='lg' />
			<Skeleton w='100%' h={8} rounded='lg' />
		</HStack>
	);
};

export default GenreSekeleton;
