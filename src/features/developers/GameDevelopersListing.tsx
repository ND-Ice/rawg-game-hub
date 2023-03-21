import { SimpleGrid } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { Developer } from './developer';
import DeveloperCard from './DeveloperCard';

interface Props {
	gameDevelopers: Developer[] | undefined;
}

const GameDevelopersListing = ({ gameDevelopers }: Props) => {
	const router = useRouter();

	const handleSelectDeveloper = (developer: Developer) =>
		router.push(`/developers/${developer.id}`);

	if (!gameDevelopers?.length) return null;

	return (
		<SimpleGrid gap={5} columns={{ base: 1, md: 2, lg: 3, xl: 4 }}>
			{gameDevelopers?.map((gameDeveloper) => (
				<DeveloperCard
					key={gameDeveloper.id}
					developer={gameDeveloper}
					onSelectDeveloper={handleSelectDeveloper}
				/>
			))}
		</SimpleGrid>
	);
};

export default GameDevelopersListing;
