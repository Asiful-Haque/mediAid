import { Box, Typography } from "@mui/material";
import { IconPencilMinus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const HealthTipExcerpt = ({ healthTip }) => {
	const navigate = useNavigate();

	return (
		<Box sx={{ px: 3, py: 2, "&:hover .edit-icon": { display: "inline-block" } }}>
			<Typography
				variant="h5"
				component="h1"
				sx={{ mb: 1.5, fontWeight: 500, color: "#4d3e60" }}
			>
				{healthTip.id}. {healthTip.title}{" "}
				<Typography
					component="span"
					title="Edit"
					className="edit-icon"
					sx={{ display: "none", cursor: "pointer" }}
				>
					<IconPencilMinus
						onClick={() => navigate("/health-tips/edit", { state: healthTip })}
						size={20}
					/>
				</Typography>
			</Typography>
			<Typography variant="body1" sx={{ color: "#000000e3" }}>
				{healthTip.description}
			</Typography>
		</Box>
	);
};

export default HealthTipExcerpt;
