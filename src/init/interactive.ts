import path from "path";
import clone from "./clone";
import { validateFolder } from "./utils";
import { intro, log, outro } from "@clack/prompts";
import { TEMPLATES, THIS_REPO } from "../constants";
import {
	promptForLanguage,
	promptForDirectory,
	promptForTemplate,
} from "./prompts";

export default async (force: boolean) => {
	intro("Cloudspark CLI ⚡️");
	log.message("Let's get started by selecting a template.");

	// Ask the user for input.
	const template = await promptForTemplate(TEMPLATES);
	const language = await promptForLanguage(template);
	const targetDir = await promptForDirectory();

	// Normalize the path.
	const normalizedTarget = path.normalize(targetDir);

	// Perform validation on the path.
	await validateFolder(normalizedTarget, force);

	// Clone the repo.
	await clone(THIS_REPO, `${template.name}/${language}`, normalizedTarget);

	outro(`Done! Your Worker is ready to go at "${targetDir}"`);
	process.exit(0);
};
