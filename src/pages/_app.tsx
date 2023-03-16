import '@/styles/globals.css';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';

import theme from '@/config/theme';

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={client}>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<Component {...pageProps} />
			</QueryClientProvider>
		</ChakraProvider>
	);
}
