import { defineConfig } from "vitest/config"

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        setupFiles: [],
        include: ['tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
        testTimeout: 30000
    }
})