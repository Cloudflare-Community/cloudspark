import clone from "./clone";
import { normalize } from "path";
import { statSync, readdirSync, existsSync } from "fs";
import { intro, outro, select, text, log, isCancel, confirm } from "@clack/prompts";
import { validateFolder } from "./utils";

export default async (template: string, target: string | null, force: boolean) => {
	// User didn't provide a repo, enter interactive mode.
	intro("Cloudspark CLI ⚡️");

	let finalTarget: string;
	if (target != null) {
		log.message(`Express mode active. Initializing "${template}" in folder "${target}".`);
		finalTarget = target;
	} else {
		log.message(`Express mode active. Initializing "${template}".`);

		// Ask the user for a target directory.
		const target = await text({
			message: "Enter the target directory you want to initialize into",
			placeholder: `./worker`,
			defaultValue: `./worker`,
		});
		if (isCancel(target)) {
			outro("Cancelled. No changes were made.");
			process.exit(0);
		}
		finalTarget = target;
	}

	// Normalize the path.
	const normalizedTarget = normalize(finalTarget);

	// Perform validation on the path.
	await validateFolder(normalizedTarget, force);

	// Clone the repo.
	await clone(template, normalizedTarget);

	outro(`Done! Your Worker is ready to go at ${finalTarget}`)
	process.exit(0);
}