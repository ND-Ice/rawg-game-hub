import Link from 'next/link';
import { ReactNode } from 'react';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface Props {
	children: ReactNode;
	href: string;
}

const NavbarLink = ({ children, href }: Props) => {
	const router = useRouter();

	const isActive: boolean = href === router.pathname;

	return (
		<Link href={href}>
			<Button variant={isActive ? 'solid' : 'ghost'}>{children}</Button>
		</Link>
	);
};

export default NavbarLink;
