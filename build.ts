import { build } from "esbuild";

console.log("Building...");
const date = new Date();
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
		js: `#!/usr/bin/env node\nimport { createRequire as topLevelCreateRequire } from "module";const require = topLevelCreateRequire(import.meta.url);`,
	},
});
console.log("Built in " + (new Date().getTime() - date.getTime()) + "ms.");
