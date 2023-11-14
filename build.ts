import { build } from "esbuild";
import { join } from "path"
import { readdirSync, statSync, readFileSync } from "fs";

const manifest = readdirSync("./templates").filter(e => statSync(join("./templates", e)).isDirectory()).map(name => {
	const info = JSON.parse(readFileSync(join("templates", name, "info.json"), "utf-8")) as { name: string, description: string };
	const directories = readdirSync(join("templates", name)).filter(e => statSync(join("templates", name, e)).isDirectory());
	return {
		name,
		displayName: info.name,
		description: info.description,
		langs: directories
	}
});

console.log(manifest);

// await build({
// 	entryPoints: ["./src/index.ts"],
// 	bundle: true,
// 	// minify: true,
// 	sourcemap: true,
// 	outdir: "./dist",
// 	format: "esm",
// 	platform: "node",
// 	target: "esnext",
// 	// banner: {
// 	// 	js: `import path from "path";\nimport { fileURLToPath } from "url";\nimport { createRequire as topLevelCreateRequire } from "module";\nconst require = topLevelCreateRequire(import.meta.url);\nconst __filename = fileURLToPath(import.meta.url);\nconst __dirname = path.dirname(__filename);`,
// 	// },
// })