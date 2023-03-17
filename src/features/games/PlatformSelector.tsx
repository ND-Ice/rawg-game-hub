import { useQuery } from 'react-query';
import {
	Button,
	Icon,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
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
