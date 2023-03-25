import Link from 'next/link';
import {
	Heading,
	HStack,
	IconButton,
	Show,
	useColorModeValue,
} from '@chakra-ui/react';

import ColorModeSwitch from '@/components/ColorModeSwitch';
import NavbarLink from './NavbarLink';
import { FiMenu, FiSearch } from 'react-icons/fi';

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
					<NavbarLink href='/'>Games</NavbarLink>
					<NavbarLink href='/developers'>Developers</NavbarLink>
					<NavbarLink href='/stores'>Game Stores</NavbarLink>
				</HStack>
			</Show>
			<HStack>
				<IconButton
					aria-label='Search Button'
					rounded='full'
					icon={<FiSearch />}
				/>
				<ColorModeSwitch />
				<IconButton aria-label='Menu Toggle' rounded='full' icon={<FiMenu />} />
			</HStack>
		</HStack>
	);
};

export default Navbar;
