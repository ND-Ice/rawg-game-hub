import { HStack, Icon, useColorModeValue } from '@chakra-ui/react';
import {
	FaWindows,
	FaPlaystation,
	FaXbox,
	FaApple,
	FaLinux,
	FaAndroid,
} from 'react-icons/fa';
import { MdPhoneIphone } from 'react-icons/md';
import { SiNintendo } from 'react-icons/si';
import { BsGlobe } from 'react-icons/bs';
import { IconType } from 'react-icons';

import { Platform } from './games';

interface Props {
	platforms: Platform[] | undefined;
}

const iconMap: { [key: string]: IconType } = {
	pc: FaWindows,
	playstation: FaPlaystation,
	xbox: FaXbox,
	nintendo: SiNintendo,
	mac: FaApple,
	linux: FaLinux,
	ios: MdPhoneIphone,
	web: BsGlobe,
	android: FaAndroid,
};

const PlatformIconList = ({ platforms }: Props) => {
	const iconhoverColor = useColorModeValue('gray.800', 'gray.100');
	const iconColor = useColorModeValue('gray.500', 'gray.500');

	if (!platforms?.length) return null;

	return (
		<HStack>
			{platforms?.map((platform) => (
				<Icon
					color={iconColor}
					boxSize={5}
					key={platform.id}
					as={iconMap[platform.slug]}
					transition='all 300ms ease'
					_hover={{ color: iconhoverColor }}
				/>
			))}
		</HStack>
	);
};

export default PlatformIconList;
