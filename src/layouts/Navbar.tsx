import { Heading, HStack, useColorModeValue } from '@chakra-ui/react';

import ColorModeSwitch from '@/components/ColorModeSwitch';

const Navbar = () => {
	return (
		<HStack
			justify='space-between'
			p={5}
			bg={useColorModeValue('white', 'gray.800')}
		>
			<Heading size='lg' fontWeight='extrabold'>
				RAWG
			</Heading>
			<ColorModeSwitch />
		</HStack>
	);
};

export default Navbar;
