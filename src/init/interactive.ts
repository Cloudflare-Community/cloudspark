import clone from "./clone";
import path from "path";
import { intro, select, text, log, isCancel, outro } from "@clack/prompts";
import { validateFolder } from "./utils";
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

	log.info(`Done! Your Worker is ready to go at "${targetDir}"`);
	outro();
	process.exit(0);
};
