import { Grid, GridItem, Show } from '@chakra-ui/react';

import GameListing from '@/features/games/GameListing';
import GenreSelector from '@/features/games/GenreSelector';
import useGameQuery from '@/features/games/useGameQuery';

export default function Home() {
	const { gameQuery, updateGameQuery } = useGameQuery();

	return (
		<Grid
			p={5}
			gap={{ base: 0, lg: 10 }}
			templateColumns={{ base: '1fr', lg: '300px 1fr' }}
		>
			<GridItem>
				<Show above='lg'>
					<GenreSelector
						selectedGenre={gameQuery?.genres}
						onSelectGenre={(genres) => updateGameQuery({ genres })}
					/>
				</Show>
			</GridItem>
			<GridItem>
				<GameListing />
			</GridItem>
		</Grid>
	);
}
