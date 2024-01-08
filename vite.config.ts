import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
    const config = {
        plugins: [react()],
        base: '/',
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id: any) {
                        if (id.includes('src/pages/HomePage.tsx')) {
                            return 'homePage';
                        } else if (
                            id.includes('src/pages/ConfiguratorPage.tsx')
                        ) {
                            return 'configuratorPage';
                        } else if (id.includes('src/pages/MapPage.tsx')) {
                            return 'mapPage';
                        }
                    }
                }
            }
        }
    };

    if (command !== 'serve') {
        config.base = '/proj-map/';
    }

    return config;
});
