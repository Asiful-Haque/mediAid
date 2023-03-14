import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	Box,
	FormControl,
	InputLabel,
	OutlinedInput,
	useTheme,
	FormHelperText,
	Button,
} from "@mui/material";
import { IconPencilPlus, IconReportMedical } from "@tabler/icons-react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import RichTextEditor from "../../components/RichTextEditor";
import { useQuill } from "react-quilljs";

const options = {
	toolbar: [
		["bold", "italic", "underline", "strike"],
		[{ align: [] }],

		[{ list: "ordered" }, { list: "bullet" }],
		[{ indent: "-1" }, { indent: "+1" }],

		[{ size: ["small", false, "large", "huge"] }],
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		["link"],
		[{ color: [] }, { background: [] }],

		["clean"],
	],
	clipboard: {
		matchVisual: false,
	},
};

const HealthTipForm = ({ isUpdateCase, setIsUpdateCase }) => {
	const theme = useTheme();
	const { state } = useLocation();
	const { quill, quillRef } = useQuill({
		modules: options,
		placeholder: "Write about the health tip...",
	});

	const schema = yup
		.object({
			title: yup.string().required("Title is required"),
			description: yup
				.string()
				.min(25, "Description must be at least 25 characters")
				.required("Description is required"),
		})
		.required();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			title: state?.title || "",
			description: state?.description || "",
		},
	});

	const onSubmit = (data) => {
		toast.success("Successfully get the data");
		console.log(data);
		reset();
		quill.clipboard.dangerouslyPasteHTML("");
	};

	useEffect(() => {
		if (Boolean(state)) {
			setIsUpdateCase(true);
		}
	}, []);

	useEffect(() => {
		if (quill) {
			if (state?.description) {
				quill.clipboard.dangerouslyPasteHTML(state?.description);
			}

			quill.on("text-change", (delta, oldDelta, source) => {
				setValue("description", quillRef.current.firstChild.innerHTML);
			});
		}
	}, [quill]);

	return (
		<Box
			component="form"
			noValidate
			sx={{ padding: { xs: "16px", sm: "20px" } }}
			onSubmit={handleSubmit(onSubmit)}
		>
			<FormControl
				fullWidth
				error={Boolean(errors.title)}
				sx={{ ...theme.customInput, mb: "13px" }}
			>
				<InputLabel htmlFor="outlined-adornment-title">Health Tip's Title</InputLabel>
				<OutlinedInput
					id="outlined-adornment-title"
					{...register("title")}
					label="title"
					// disabled={state.submitting}
				/>
				{errors.title && (
					<FormHelperText error id="standard-weight-helper-text-title">
						{errors.title?.message}
					</FormHelperText>
				)}
			</FormControl>

			<RichTextEditor
				data={state?.description}
				error={Boolean(errors.description?.message)}
				quillRef={quillRef}
			/>

			{errors.description && (
				<FormHelperText sx={{ ml: 2, mt: "-5px" }} error>
					{errors.description?.message}
				</FormHelperText>
			)}

			<Button
				size="large"
				disableElevation
				sx={{ color: "whitesmoke", mt: "10px", mb: "20px" }}
				endIcon={
					isUpdateCase ? <IconPencilPlus size={18} /> : <IconReportMedical size={18} />
				}
				variant="contained"
				type="submit"
				// disabled={state.submitting}
			>
				{isUpdateCase ? "Update" : "Add"}
			</Button>
		</Box>
	);
};

export default HealthTipForm;