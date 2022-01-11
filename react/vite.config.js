import react from '@vitejs/plugin-react'
import {defineConfig, loadEnv} from "vite";
 
export default ({command, mode}) => {
    const envConfig = loadEnv(mode, './');
    let config = {
        plugins: [react()],
    };
 
    return defineConfig(config)
}