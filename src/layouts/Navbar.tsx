import Link from 'next/link';
import { Heading, HStack, Show, useColorModeValue } from '@chakra-ui/react';

import navLinks from '@/data/navLinks';
import ColorModeSwitch from '@/components/ColorModeSwitch';
import NavbarLink from './NavbarLink';
import MobileMenu from './MobileMenu';
import SearchModal from '@/features/games/SearchModal';

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
			<Show above='md'>
				<HStack>
					{navLinks.map((navLink) => (
						<NavbarLink key={navLink.href} href={navLink.href}>
							{navLink.label}
						</NavbarLink>
					))}
				</HStack>
			</Show>
			<HStack>
				<SearchModal />
				<ColorModeSwitch />
				<Show below='sm'>
					<MobileMenu />
				</Show>
			</HStack>
		</HStack>
	);
};

export default Navbar;
