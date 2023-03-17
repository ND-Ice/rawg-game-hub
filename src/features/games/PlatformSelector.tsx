import { useQuery } from 'react-query';
import {
	Button,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorModeValue,
} from '@chakra-ui/react';

import client from '@/config/client';
import { Platform } from './games';
import { FiChevronDown } from 'react-icons/fi';

interface PlatformReponse {
	count: number;
	results: Platform[];
}

interface Props {
	selectedPlatform?: Platform | null;
	onSelectPlatform: (platform: Platform) => void;
}

const PlatformSelector = ({ selectedPlatform, onSelectPlatform }: Props) => {
	const { data: platforms } = useQuery<PlatformReponse, Error, Platform[]>({
		queryKey: ['platforms'],
		queryFn: () =>
			client
				.get('/platforms/lists/parents')
				.then(({ data }) => data)
				.catch((err) => err),
		select: (data) => data.results,
	});

	const activeColor = useColorModeValue('gray.200', 'gray.800');

	return (
		<Menu>
			<MenuButton as='div' cursor='pointer'>
				<Button>
					{selectedPlatform?.name || 'Select Platform'}{' '}
					<Icon ml={2} as={FiChevronDown} />
				</Button>
			</MenuButton>
			<MenuList>
				{platforms?.map((platform) => (
					<MenuItem
						bg={platform.id === selectedPlatform?.id ? activeColor : undefined}
						key={platform.id}
						onClick={() => onSelectPlatform(platform)}
					>
						{platform.name}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
};

export default PlatformSelector;
