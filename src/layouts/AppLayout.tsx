import { ReactNode } from 'react';
import { Box, Grid, GridItem } from '@chakra-ui/react';

import Navbar from './Navbar';

interface Props {
	children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
	return (
		<Box h='100vh' overflow='auto'>
			<Grid maxW='7xl' mx='auto' templateRows='auto 1fr'>
				<GridItem pos='sticky' top={0} zIndex={1000}>
					<Navbar />
				</GridItem>
				<GridItem>{children}</GridItem>
			</Grid>
		</Box>
	);
};

export default AppLayout;
