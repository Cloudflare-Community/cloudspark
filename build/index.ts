import { cpSync } from "fs";
import { buildSync } from "esbuild";

console.log("[Cloudspark] Building...");
let start = new Date();
buildSync({
	entryPoints: ["./src/index.ts"],
	bundle: true,
	minify: true,
	outfile: "./dist/cloudspark/index.js",
	format: "esm",
	platform: "node",
	target: "esnext",
	banner: {
		js: `import { createRequire as topLevelCreateRequire } from "module";const require = topLevelCreateRequire(import.meta.url);`,
	},
});
console.log(
	"[Cloudspark] Built in " + (new Date().getTime() - start.getTime()) + "ms.",
);
console.log("[Cloudspark] Scaffolding Project...");
cpSync("./build/cmdEntry.js", "./dist/cloudspark/entry.js");
cpSync("./build/cloudspark.json", "./dist/cloudspark/package.json");
cpSync("README.md", "./dist/cloudspark/README.md");
cpSync("LICENSE", "./dist/cloudspark/LICENSE");
console.log("[Cloudspark] Done!");

console.log("[Create] Building...");
start = new Date();
buildSync({
	entryPoints: ["./build/createShim.js"],
	bundle: true,
	minify: true,
	outfile: "./dist/create/index.js",
	format: "esm",
	platform: "node",
	target: "esnext",
	// external: ["cloudspark"],
	banner: {
		js: `#!/usr/bin/env node\nimport { createRequire as topLevelCreateRequire } from "module";const require = topLevelCreateRequire(import.meta.url);`,
	},
});
console.log(
	"[Create] Built in " + (new Date().getTime() - start.getTime()) + "ms.",
);
console.log("[Cloudspark] Scaffolding Project...");
cpSync("./build/create.json", "./dist/create/package.json");
cpSync("./build/CREATE.md", "./dist/create/README.md");
cpSync("LICENSE", "./dist/create/LICENSE");
console.log("[Cloudspark] Done!");
