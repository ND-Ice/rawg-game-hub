import { Card, Skeleton, SkeletonText } from '@chakra-ui/react';

const GameCardLoading = () => {
	return (
		<Card rounded='lg' overflow='hidden'>
			<Skeleton h='250px' />
			<SkeletonText />
		</Card>
	);
};

export default GameCardLoading;
