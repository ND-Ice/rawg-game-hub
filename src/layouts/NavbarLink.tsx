import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface Props extends LinkProps {
	children: ReactNode;
	href: string;
}

const NavbarLink = ({ children, href, ...props }: Props) => {
	const router = useRouter();

	const isActive: boolean = href === router.pathname;

	return (
		<Link href={href} {...props}>
			<Button variant={isActive ? 'solid' : 'ghost'}>{children}</Button>
		</Link>
	);
};

export default NavbarLink;
