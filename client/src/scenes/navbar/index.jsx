import { Box, IconButton, InputBase, Typography, Select, MenuItem, FormControl, useTheme, useMediaQuery } from '@mui/material';
import { Search, Message, DarkMode, LightMode, Notifications, Help, Menu, Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//local imports
import { setMode, setLogout } from 'state';
import FlexBetween from 'components/FlexBetween';

const Navbar = () => {
	const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector((state) => state.user);
	const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

	//theme setup
	const theme = useTheme();
	const neutralLight = theme.palette.neutral.light;
	const dark = theme.palette.neutral.dark;
	const background = theme.palette.background.default;
	const primaryLight = theme.palette.primary.light;
	const alt = theme.palette.background.alt;

	const fullName = `${user.firstName} ${user.lastName}`;

	return (
		<FlexBetween padding='1rem 6%' backgroundColor={alt}>
			<FlexBetween gap='1.75rem'>
				<Typography
					fontWeight='bold'
					fontSize='clamp(1rem, 2rem, 2.5rem'
					color='primary'
					onClick={() => navigate('/home')}
					sx={{
						'&:hover': {
							color: primaryLight,
							cursor: 'pointer',
						},
					}}
				>
					Diaries
				</Typography>
				{isNonMobileScreens && (
					<FlexBetween backgroundColor={neutralLight} borderRadius='10px' gap='3rem' padding='0.1rem 1.5rem'>
						<InputBase placeholder='Search...' />
						<IconButton>
							<Search />
						</IconButton>
					</FlexBetween>
				)}
			</FlexBetween>
		</FlexBetween>
	);
};

export default Navbar;