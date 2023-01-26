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

	const fullName = `${user?.firstName} ${user?.lastName}`;

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
				{/* For screens that aren't mobile view */}
				{isNonMobileScreens && (
					<FlexBetween backgroundColor={neutralLight} borderRadius='10px' gap='3rem' padding='0.1rem 1.5rem'>
						<InputBase placeholder='Search...' />
						<IconButton>
							<Search />
						</IconButton>
					</FlexBetween>
				)}
			</FlexBetween>

			{/* Desktop Nav */}
			{isNonMobileScreens ? (
				<FlexBetween gap='2rem'>
					<IconButton onClick={() => dispatch(setMode())}>
						{theme.palette.mode === 'dark' ? <DarkMode sx={{ fontSize: '25px' }} /> : <LightMode sx={{ fontSize: '25px', color: dark }} />}
					</IconButton>
					<Message sx={{ fontSize: '25px' }} />
					<Notifications sx={{ fontSize: '25px' }} />
					<Help sx={{ fontSize: '25px' }} />
					<FormControl variant='standard' value={fullName}>
						<Select
							value={fullName}
							sx={{
								backgroundColor: neutralLight,
								width: '170px',
								borderRadius: '0.25rem',
								p: '0.25rem 1rem',
								'& .MuiSvgIcon-root': {
									pr: '0.25rem',
									width: '3rem',
								},
								'& .MuiSelect-select:focus': {
									backgroundColor: neutralLight,
								},
							}}
							input={<InputBase />}
						>
							<MenuItem value={fullName}>
								<Typography>{fullName}</Typography>
							</MenuItem>
							<MenuItem onClick={() => setLogout()}>Log Out</MenuItem>
						</Select>
					</FormControl>
				</FlexBetween>
			) : (
				<IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
					<Menu />
				</IconButton>
			)}

			{/* Mobile Nav */}
			{!isNonMobileScreens && isMobileMenuToggled && (
				<Box position='fixed' right='0' bottom='0' height='100%' zIndex='10' maxWidth='500px' minWidth='300px' backgroundColor={background}>
					{/* Close Icon */}
					<Box display='flex' justifyContent='flex-end' p='1rem'>
						<IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
							<Close />
						</IconButton>
					</Box>

					{/* Menu Items */}
					<FlexBetween gap='3rem' display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
						<IconButton onClick={() => dispatch(setMode())} sx={{ fontSize: '25px' }}>
							{theme.palette.mode === 'dark' ? <DarkMode sx={{ fontSize: '25px' }} /> : <LightMode sx={{ fontSize: '25px', color: dark }} />}
						</IconButton>
						<Message sx={{ fontSize: '25px' }} />
						<Notifications sx={{ fontSize: '25px' }} />
						<Help sx={{ fontSize: '25px' }} />
						<FormControl variant='standard' value={fullName}>
							<Select
								value={fullName}
								sx={{
									backgroundColor: neutralLight,
									width: '150px',
									borderRadius: '0.25rem',
									p: '0.25rem 1rem',
									'& .MuiSvgIcon-root': {
										pr: '0.25rem',
										width: '3rem',
									},
									'& .MuiSelect-select:focus': {
										backgroundColor: neutralLight,
									},
								}}
								input={<InputBase />}
							>
								<MenuItem value={fullName}>
									<Typography>{fullName}</Typography>
								</MenuItem>
								<MenuItem onClick={() => setLogout()}>Log Out</MenuItem>
							</Select>
						</FormControl>
					</FlexBetween>
				</Box>
			)}
		</FlexBetween>
	);
};

export default Navbar;
