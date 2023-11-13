import { build } from "esbuild";

await build({
	entryPoints: ["./src/index.ts"],
	bundle: true,
	minify: true,
	sourcemap: true,
	outdir: "./dist",
	format: "esm",
	platform: "node",
	target: "esnext",
	banner: {
		js: `import path from "path";\nimport { fileURLToPath } from "url";\nimport { createRequire as topLevelCreateRequire } from "module";\nconst require = topLevelCreateRequire(import.meta.url);\nconst __filename = fileURLToPath(import.meta.url);\nconst __dirname = path.dirname(__filename);`,
	},
})