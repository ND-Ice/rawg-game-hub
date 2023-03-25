import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import {
	Heading,
	HStack,
	IconButton,
	Show,
	useColorModeValue,
} from '@chakra-ui/react';

import navLinks from '@/data/navLinks';
import ColorModeSwitch from '@/components/ColorModeSwitch';
import NavbarLink from './NavbarLink';
import MobileMenu from './MobileMenu';

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
				<IconButton
					aria-label='Search Button'
					rounded='full'
					icon={<FiSearch />}
				/>
				<ColorModeSwitch />
				<MobileMenu />
			</HStack>
		</HStack>
	);
};

export default Navbar;
