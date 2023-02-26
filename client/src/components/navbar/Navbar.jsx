import { cloneElement, useState } from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, Stack, useScrollTrigger } from "@mui/material";
import { IconBell as NotificationsNoneIcon } from "@tabler/icons-react";
// import { useStateContext } from "../../contexts/ContextProvider";
import CustomIconButton from "../../theme/customComponent/CustomIconButton";
import SearchBar from "../SearchBar";
import ProfileBtn from "../navbar/ProfileBtn";
import DrawerHeaderContents from "../navbar/DrawerHeaderContents";
import { useDispatch, useSelector } from "react-redux";
import { toggle, drawerStatus } from "../../features/drawer/drawerSlice";

const ElevationScroll = ({ children }) => {
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
};

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const CustomAppBar = styled(AppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
}));

const Navbar = ({ handleNotificationClick, handleClick }) => {
	const drawerOpen = useSelector(drawerStatus);

	const dispatch = useDispatch();

	const [showFullSearch, setShowFullSearch] = useState(false);

	const handleShowFullSearch = () => {
		setShowFullSearch((prev) => !prev);
	};
	return (
		<ElevationScroll>
			<CustomAppBar
				sx={{ height: "83px", zIndex: { xs: 1200, md: 1201 } }}
				elevation={0}
				color="light"
				position="fixed"
				open={drawerOpen}
			>
				{/* ============= visible full search ============ */}
				{showFullSearch && (
					<SearchBar
						sm="flex"
						md="none"
						lgWidth="100%"
						mdWidth="100%"
						smWidth="100%"
						position="absolute"
						handleShowFullSearch={handleShowFullSearch}
					/>
				)}
				<Toolbar sx={{ display: "flex", alignItems: "center", height: "100%" }}>
					<DrawerHeader
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: {
								xs: "flex-start",
								sm: "flex-start",
								md: "space-between",
							},
							gap: 2,
							minWidth: { xs: 105, md: 234 },
							pl: { xs: 0, sm: 0 },
						}}
					>
						{/* =========== drawer contents =========== */}
						<DrawerHeaderContents
							handleShowFullSearch={handleShowFullSearch}
							handleLeftDrawerToggle={() => dispatch(toggle())}
						/>
					</DrawerHeader>
					<Stack
						direction="row"
						width="100%"
						alignItems="center"
						sx={{
							justifyContent: {
								xs: "flex-end",
								sm: "flex-end",
								md: "space-between",
							},
							ml: 1,
						}}
					>
						<SearchBar
							sm="none"
							md="flex"
							lgWidth="430px"
							mdWidth="250px"
							smWidth="250px"
						/>
						<Stack direction="row" alignItems="center" gap={2}>
							<CustomIconButton onClick={handleNotificationClick}>
								<NotificationsNoneIcon size={22} />
							</CustomIconButton>
							<ProfileBtn handleClick={handleClick} />
						</Stack>
					</Stack>
				</Toolbar>
			</CustomAppBar>
		</ElevationScroll>
	);
};

export default Navbar;
