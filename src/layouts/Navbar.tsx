import { Heading, HStack, useColorModeValue } from '@chakra-ui/react';

import ColorModeSwitch from '@/components/ColorModeSwitch';
import Link from 'next/link';

const Navbar = () => {
	return (
		<HStack
			justify='space-between'
			p={5}
			bg={useColorModeValue('white', 'gray.800')}
		>
			<Link href='/'>
				<Heading size='lg' fontWeight='extrabold'>
					RAWG
				</Heading>
			</Link>
			<ColorModeSwitch />
		</HStack>
	);
};

export default Navbar;
