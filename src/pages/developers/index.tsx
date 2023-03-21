import client from '@/config/client';
import { Developer } from '@/features/developers/developer';
import DeveloperCard from '@/features/developers/DeveloperCard';
import GameDevelopersListing from '@/features/developers/GameDevelopersListing';
import { Box } from '@chakra-ui/react';
import { useQuery } from 'react-query';

interface GameDevelopersResponse {
	count: number;
	next: string;
	previous: string;
	results: Developer[];
}

const Developers = () => {
	const { data: gameDevelopers } = useQuery<
		GameDevelopersResponse,
		Error,
		Developer[]
	>({
		queryKey: ['game-developers'],
		queryFn: () =>
			client
				.get('/developers')
				.then(({ data }) => data)
				.catch((err) => err),
		select: (data) => data.results,
	});

	return (
		<Box p={5}>
			<GameDevelopersListing gameDevelopers={gameDevelopers} />
		</Box>
	);
};

export default Developers;
