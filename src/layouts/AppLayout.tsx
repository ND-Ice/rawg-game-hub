import GenreSelector from '@/features/games/GenreSelector';
import { Grid, GridItem, Show } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface Props {
	children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
	return (
		<Grid h='100vh' overflow='auto' templateRows='auto 1fr'>
			<GridItem pos='sticky' top={0} zIndex={1000}>
				<Navbar />
			</GridItem>
			<GridItem>{children}</GridItem>
		</Grid>
	);
};

export default AppLayout;
