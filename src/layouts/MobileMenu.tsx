import { FiMenu } from 'react-icons/fi';
import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Grid,
	IconButton,
	useDisclosure,
} from '@chakra-ui/react';

import navLinks from '@/data/navLinks';
import NavbarLink from './NavbarLink';

const MobileMenu = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<IconButton
				onClick={onOpen}
				aria-label='Menu Toggle'
				rounded='full'
				icon={<FiMenu />}
			/>
			<Drawer isOpen={isOpen} placement='right' onClose={onClose}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>RAWG</DrawerHeader>

					<DrawerBody>
						<Grid gap={5}>
							{navLinks.map((navLink) => (
								<NavbarLink
									key={navLink.href}
									href={navLink.href}
									onClick={onClose}
								>
									{navLink?.label}
								</NavbarLink>
							))}
						</Grid>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default MobileMenu;
