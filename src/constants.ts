export const THIS_REPO = "cloudflare-community/cloudspark";

const LANGUAGES = {
	js: {
		name: "js",
		displayName: "JavaScript",
		description: "Plain JavaScript",
	},
	ts: {
		name: "ts",
		displayName: "TypeScript",
		description: "TypeScript with types set up for Cloudflare Workers",
	},
	rs: {
		name: "rs",
		displayName: "Rust",
		description: "Rust, running using the workers.rs project",
	},
};

export type Language = {
	name: string;
	displayName: string;
	description: string;
};
export type Template = {
	name: string;
	displayName: string;
	description: string;
	languages: Language[];
};
export const TEMPLATES = [
	{
		name: "hello-world",
		displayName: "Hello World",
		description:
			"A simple Hello World script for getting started with Cloudflare Workers",
		languages: [LANGUAGES.ts, LANGUAGES.js, LANGUAGES.rs],
	},
];
