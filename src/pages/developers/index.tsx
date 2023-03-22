import { Box, SimpleGrid } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import client from '@/config/client';
import { Developer } from '@/features/developers/developer';
import GameDeveloperCardLoading from '@/features/developers/GameDeveloperCardLoading';
import GameDevelopersListing from '@/features/developers/GameDevelopersListing';

interface GameDevelopersResponse {
	count: number;
	next: string;
	previous: string;
	results: Developer[];
}

const Developers = () => {
	const { data: gameDevelopers, isLoading } = useQuery<
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
			{isLoading && (
				<SimpleGrid gap={5} columns={{ base: 1, md: 2, lg: 3, xl: 4 }}>
					{isLoading &&
						[...Array(10).keys()].map((e) => (
							<GameDeveloperCardLoading key={e} />
						))}
				</SimpleGrid>
			)}
			<GameDevelopersListing gameDevelopers={gameDevelopers} />
		</Box>
	);
};

export default Developers;
