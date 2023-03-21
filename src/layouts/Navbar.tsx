import Link from 'next/link';
import { Heading, HStack, useColorModeValue } from '@chakra-ui/react';

import ColorModeSwitch from '@/components/ColorModeSwitch';
import NavbarLink from './NavbarLink';

const Navbar = () => {
	return (
		<HStack
			p={5}
			justify='space-between'
			bg={useColorModeValue('white', 'gray.800')}
		>
			<Link href='/'>
				<Heading letterSpacing='widest' size='lg' fontWeight='extrabold'>
					RAWG
				</Heading>
			</Link>
			<HStack>
				<NavbarLink href='/'>Games</NavbarLink>
				<NavbarLink href='/developers'>Developers</NavbarLink>
				<NavbarLink href='/store-fronts'>Store Fronts</NavbarLink>
			</HStack>
			<ColorModeSwitch />
		</HStack>
	);
};

export default Navbar;
