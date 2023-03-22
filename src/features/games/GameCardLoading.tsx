import { Card, CardBody, Skeleton, SkeletonText } from '@chakra-ui/react';

const GameCardLoading = () => {
	return (
		<Card rounded='lg' overflow='hidden'>
			<Skeleton h='250px' />
			<CardBody>
				<SkeletonText />
			</CardBody>
		</Card>
	);
};

export default GameCardLoading;
