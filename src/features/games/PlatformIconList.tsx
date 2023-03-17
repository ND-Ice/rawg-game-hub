import { HStack, Text } from '@chakra-ui/react';

import { Platform } from './games';

interface Props {
	platforms: Platform[];
}

const PlatformIconList = ({ platforms }: Props) => {
	return (
		<HStack>
			{platforms?.map((platform) => (
				<Text key={platform.id}>{platform.name}</Text>
			))}
		</HStack>
	);
};

export default PlatformIconList;
