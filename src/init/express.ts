import path from "path";
import clone from "./clone";
import { validateFolder } from "./utils";
import { promptForDirectory } from "./prompts";
import { intro, log, outro } from "@clack/prompts";
import { TEMPLATES, THIS_REPO } from "../constants";

export default async (
	template: string,
	targetDir: string | null,
	force: boolean,
) => {
	intro("Cloudspark CLI ⚡️");

	let finalTemplate = null;
	let finalLanguage = null;
	if (!template.startsWith("http")) {
		if (template.split("/").length != 2) {
			log.error(
				"Template specified is invalid; template should be formatted like NAME/LANGUAGE.",
			);
			outro("Exited. No changes were made.");
			process.exit(1);
		}

		const requestedName = template.split("/")[0];
		const requestedLanguage = template.split("/")[1];

		// Template is probably part of this repo.
		const foundTemplate = TEMPLATES.find(
			(t) =>
				t.name == requestedName &&
				t.languages.map((l) => l.name).includes(requestedLanguage),
		);
		if (foundTemplate == null) {
			// Template not found.
			log.error(
				`Template "${requestedName}" with language "${requestedLanguage}" not found. Please check the spelling and try again.`,
			);
			outro();
			process.exit(1);
		}
		finalTemplate = foundTemplate.name;
		finalLanguage = requestedLanguage;
	} else {
		// Template is an absolute URL.
		finalTemplate = template;
	}

	let finalTargetDir: string;
	if (targetDir != null) {
		log.message(
			`Express mode active. Initializing the "${finalTemplate}" template with language "${finalLanguage}" in folder "${targetDir}".`,
		);
		finalTargetDir = targetDir;
	} else {
		log.message(
			`Express mode active. Initializing the "${finalTemplate}" template with language ${finalLanguage}.`,
		);

		// Ask the user for a target directory.
		finalTargetDir = await promptForDirectory();
	}

	// Normalize the path.
	const normalizedTarget = path.normalize(finalTargetDir);

	// Perform validation on the path.
	await validateFolder(normalizedTarget, force);

	// Clone the repo.
	await clone(THIS_REPO, `${finalTemplate}/${finalLanguage}`, normalizedTarget);

	log.info(`Done! Your Worker is ready to go at "${finalTargetDir}"`);
	outro();
	process.exit(0);
};
