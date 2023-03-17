import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

const GameFilter = () => {
	return (
		<Menu>
			<MenuButton as='div'>
				<Button>MenuButton</Button>
			</MenuButton>
			<MenuList>
				<MenuItem>Sample Item</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default GameFilter;
