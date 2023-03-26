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

import { Game } from './games';
import SearchItem from './SearchItem';
import client from '@/config/client';

interface FetchedGameResults {
	count: number;
	next: string;
	previous: string;
	results: Game[];
}

const SearchModal = () => {
	const { isOpen, onClose, onOpen } = useDisclosure();

	const { data: searchResults } = useQuery<FetchedGameResults, Error, Game[]>({
		queryKey: ['search-results'],
		queryFn: () =>
			client
				.get(`/games`)
				.then(({ data }) => data)
				.catch((err) => err),
		select: (data) => data.results,
	});

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
							<Input variant='filled' placeholder='Search Games...' />
						</InputGroup>
						<Stack mt={5}>
							<Text>Search Results (20)</Text>
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
									/>
								))}
							</Grid>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default SearchModal;
