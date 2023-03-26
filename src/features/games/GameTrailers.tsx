import Image from 'next/image';
import ReactPlayer from 'react-player';

import { Box } from '@chakra-ui/react';
import { GameTrailer } from './games';
import getImageURL from '@/utils/getImageURL';

interface Props {
	gameTrailers: GameTrailer[] | undefined;
	placeholder: string | undefined;
}

const GameTrailers = ({ gameTrailers, placeholder }: Props) => {
	if (!gameTrailers?.length)
		return (
			<Box
				h={{ base: 200, md: 400 }}
				rounded='lg'
				overflow='hidden'
				pos='relative'
			>
				<Image
					fill
					sizes='100%'
					style={{ objectFit: 'cover' }}
					src={getImageURL(placeholder)}
					alt='Game Banner'
					placeholder='blur'
					blurDataURL='https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
				/>
			</Box>
		);

	const idx = Math.floor(Math.random() * (gameTrailers.length - 1));
	const trailers = gameTrailers.map(({ data }) => data.max);

	return (
		<Box
			h={{ base: 200, md: 450 }}
			rounded='lg'
			bg='gray.900'
			overflow='hidden'
			sx={{ video: { objectFit: 'cover' } }}
		>
			<ReactPlayer
				width='100%'
				height='100%'
				light={placeholder}
				url={trailers[idx]}
				loop
				controls
				playing
				muted
			/>
		</Box>
	);
};

export default GameTrailers;
