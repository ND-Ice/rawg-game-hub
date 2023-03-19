import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';

import theme from '@/config/theme';
import AppLayout from '@/layouts/AppLayout';

const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={client}>
				<ColorModeScript initialColorMode={theme.config.initialColorMode} />
				<AppLayout>
					<Component {...pageProps} />
				</AppLayout>
			</QueryClientProvider>
		</ChakraProvider>
	);
}
