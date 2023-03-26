import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { FiSearch } from 'react-icons/fi';
import {
	Grid,
	IconButton,
	Input,
	InputGroup,
	InputLeftElement,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Stack,
	Text,
	useDisclosure,
} from '@chakra-ui/react';

import client from '@/config/client';
import { Game } from './games';
import SearchItem from './SearchItem';
import useGameQuery from './useGameQuery';

interface FetchedGameResults {
	count: number;
	next: string;
	previous: string;
	results: Game[];
}

const SearchModal = () => {
	const router = useRouter();
	const { gameQuery, updateGameQuery } = useGameQuery();
	const { isOpen, onClose, onOpen } = useDisclosure();

	const { data: searchResults } = useQuery<FetchedGameResults, Error, Game[]>({
		queryKey: ['search-results', gameQuery.search],
		queryFn: () =>
			client
				.get('games', { params: { search: gameQuery.search } })
				.then(({ data }) => data)
				.catch((err) => err),
		select: (data) => data.results,
	});

	const handleSelectGame = (game: Game) => {
		onClose();
		router.push(`/games/${game.id}`);
	};

	return (
		<>
			<IconButton
				aria-label='Search Button'
				rounded='full'
				icon={<FiSearch />}
				onClick={onOpen}
			/>
			<Modal isOpen={isOpen} onClose={onClose} size='lg'>
				<ModalOverlay />
				<ModalContent>
					<ModalBody p={5}>
						<InputGroup>
							<InputLeftElement pointerEvents='none'>
								<FiSearch />
							</InputLeftElement>
							<Input
								value={gameQuery?.search || ''}
								onChange={(e) => updateGameQuery({ search: e.target.value })}
								variant='filled'
								placeholder='Search Games...'
							/>
						</InputGroup>
						{(searchResults?.length || 0) > 0 && (
							<Stack mt={5}>
								<Text>Search Results ({searchResults?.length || 0})</Text>
								<Grid
									maxH={400}
									overflow='auto'
									css={{
										'&::-webkit-scrollbar': {
											display: 'none',
										},
									}}
								>
									{searchResults?.map((searchResult) => (
										<SearchItem
											key={searchResult.id}
											gameDetails={searchResult}
											onSelectGame={handleSelectGame}
										/>
									))}
								</Grid>
							</Stack>
						)}
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default SearchModal;
