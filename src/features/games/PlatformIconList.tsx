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
import { HStack, Icon } from '@chakra-ui/react';

import { Platform } from './games';

interface Props {
	platforms: Platform[];
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
	return (
		<HStack>
			{platforms?.map((platform) => (
				<Icon
					color='gray.500'
					boxSize={5}
					key={platform.id}
					as={iconMap[platform.slug]}
					transition='all 300ms ease'
					_hover={{ color: 'gray.100' }}
				/>
			))}
		</HStack>
	);
};

export default PlatformIconList;
