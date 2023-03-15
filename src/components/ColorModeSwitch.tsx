import { FiMoon, FiSun } from 'react-icons/fi';
import { IconButton, useColorMode } from '@chakra-ui/react';

const ColorModeSwitch = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	const icon = colorMode === 'dark' ? <FiSun /> : <FiMoon />;

	return (
		<IconButton
			aria-label='Color Mode Toggle'
			icon={icon}
			onClick={toggleColorMode}
		/>
	);
};

export default ColorModeSwitch;
