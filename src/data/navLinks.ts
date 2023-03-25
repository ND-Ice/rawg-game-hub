interface NavLink {
	label: string;
	href: string;
}

const navLinks: NavLink[] = [
	{ label: 'Games', href: '/' },
	{ label: 'Developers', href: '/developers' },
	{ label: 'Game Stores', href: '/stores' },
];

export default navLinks;
