import { ReactNode } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';

import Navbar from './Navbar';
import Head from 'next/head';

interface Props {
	children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
	return (
		<>
			<Head>
				<title>RAWG Inspired</title>
				<meta
					name='description'
					content="Welcome to our games website, where you can find a wide range of entertaining and exciting games to play for free! Whether you're looking for action-packed adventure games, brain-teasing puzzle games, or relaxing casual games, we've got you covered."
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Grid maxW='7xl' mx='auto' templateRows='auto 1fr'>
				<GridItem pos='sticky' top={0} zIndex={1000}>
					<Navbar />
				</GridItem>
				<GridItem>{children}</GridItem>
			</Grid>
		</>
	);
};

export default AppLayout;
