import { Grid, GridItem, Show } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface Props {
	children: ReactNode;
}

const AppLayout = ({ children }: Props) => {
	return (
		<Grid
			h='100vh'
			overflow='auto'
			templateAreas={{ base: `"nav" "main"`, lg: `"nav nav" "aside main"` }}
			templateColumns={{ base: '1fr', lg: '300px 1fr' }}
			templateRows='auto 1fr'
		>
			<GridItem gridArea='nav' pos='sticky' top={0}>
				<Navbar />
			</GridItem>
			<Show above='lg'>
				<GridItem gridArea='aside'>
					<Sidebar />
				</GridItem>
			</Show>
			<GridItem gridArea='main' p={5}>
				{children}
			</GridItem>
		</Grid>
	);
};

export default AppLayout;
