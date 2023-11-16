import { clone, buildSource } from "./clone";
import { validateFolder } from "./utils";
import { intro, log, outro } from "@clack/prompts";
import { TEMPLATES } from "../constants";
import {
	promptForLanguage,
	promptForDirectory,
	promptForTemplate,
} from "./prompts";

export default async (repo: string | undefined, folder: string | undefined, args: {
	y: boolean, force: boolean, provider: string | undefined
}) => {
	intro("Cloudspark CLI ⚡️");

	let templateSource: string;
	let targetDir: string;

	if (repo) {
		// Normalize Express-mode inputs
		log.message("Express mode active. Initializing the template.");
		const provider = args.provider ?? "github";
		templateSource = `${provider}:${repo}`;
		targetDir = folder ?? "worker";
	} else if (args.y) {
		// Bypass Mode
		log.message("Bypassing all prompts, and initializing the default template.");
		const template = TEMPLATES[0];
		templateSource = buildSource(template.name, template.languages[0].name);
		targetDir = "worker";
	} else {
		// Ask the user for input.
		log.message("Let's get started by selecting a template.");
		const template = await promptForTemplate(TEMPLATES);
		const language = await promptForLanguage(template);
		templateSource = buildSource(template.name, language);
		targetDir = await promptForDirectory();
	}

	// Perform validation on the path.
	await validateFolder(targetDir, args.force);

	// Clone the repo.
	await clone(templateSource, targetDir);

	outro(`Done! Your Worker is ready to go at "${targetDir}"`);
	process.exit(0);
};
