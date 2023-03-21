import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const GameDeveloperDetails = () => {
	const router = useRouter();
	const { developerId } = router.query;

	return <Box p={5}>{developerId}</Box>;
};

export default GameDeveloperDetails;
