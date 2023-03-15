import { Heading, HStack } from '@chakra-ui/react';

import ColorModeSwitch from '@/components/ColorModeSwitch';

const Navbar = () => {
	return (
		<HStack justify='space-between' p={5} bg='gray.800'>
			<Heading>RAWG</Heading>
			<ColorModeSwitch />
		</HStack>
	);
};

export default Navbar;
