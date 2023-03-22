import { useRouter } from 'next/router';
import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';

import client from '@/config/client';
import { GameStore } from '@/features/stores/game-store';
import GameStoreCard from '@/features/stores/GameStoreCard';
import GameStoreCardLoading from '@/features/stores/GameStoreCardLoading';

interface FetchGameStoresResponse {
	count: number;
	next: string;
	previous: string;
	results: GameStore[];
}

const Stores = () => {
	const router = useRouter();

	const { data: gameStores, isLoading } = useQuery<
		FetchGameStoresResponse,
		Error,
		GameStore[]
	>({
		queryKey: ['game-stores'],
		queryFn: () =>
			client
				.get(`/stores`)
				.then(({ data }) => data)
				.catch((err) => err),
		select: (data) => data.results,
	});

	if (isLoading)
		return (
			<SimpleGrid gap={5} columns={{ base: 1, md: 2, lg: 3, xl: 4 }}>
				{[...Array(10).keys()].map((e) => (
					<GameStoreCardLoading key={e} />
				))}
			</SimpleGrid>
		);

	const handleSelectStore = (gameStore: GameStore) => gameStore;

	return (
		<Box p={5}>
			<Heading size='lg'>Game Stores</Heading>
			<SimpleGrid mt={5} gap={5} columns={{ base: 1, md: 2, lg: 3, xl: 4 }}>
				{gameStores?.map((gameStore) => (
					<GameStoreCard
						key={gameStore?.id}
						gameStore={gameStore}
						onSelectStore={handleSelectStore}
					/>
				))}
			</SimpleGrid>
		</Box>
	);
};

export default Stores;
