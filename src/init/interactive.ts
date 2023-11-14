import clone from "./clone";
import { normalize } from "path";
import { validateFolder } from "./utils";
import { intro, outro, select, text, log, isCancel } from "@clack/prompts";

export default async (force: boolean) => {
	// User didn't provide a repo, enter interactive mode.
	intro("Cloudspark CLI ⚡️");
	log.message("Let's get started by selecting a template.");
	log.message("You can also run `cloudspark init <repo> <folder>` to initialize a specific repository.");

	// Ask the user for a template selection.
	const result: string | symbol = await select({
		message: "Select a template",
		options: [
			{
				label: "Hello World",
				value: "hello-world",
				hint: "A simple hello world Worker template"
			},
		]
	})
	if (isCancel(result)) {
		outro("Cancelled. No changes were made.");
		process.exit(0);
	}

	// Ask the user for a target directory.
	const target = await text({
		message: "Enter the target directory you want to initialize in",
		placeholder: `./${result}`,
		defaultValue: `./${result}`,
	});
	if (isCancel(target)) {
		outro("Cancelled. No changes were made.");
		process.exit(0);
	}

	// Normalize the path.
	const normalizedTarget = normalize(target);

	// Perform validation on the path.
	await validateFolder(normalizedTarget, force);

	// Clone the repo.
	await clone(`${THIS_REPO}/${result}`, normalizedTarget);

	outro(`Done! Your Worker is ready to go at ${target}`)
	process.exit(0);
}