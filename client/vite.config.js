import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [commonjs(), react()],
	devOptions: {
		errorOverlay: true,
	},
	server: { port: 3000 },
});
