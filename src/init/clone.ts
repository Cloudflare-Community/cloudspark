import { THIS_REPO } from "../constants";
import { downloadTemplate } from "giget";
import { outro, spinner } from "@clack/prompts";

const buildSource = (template: string, language: string) => `github:${THIS_REPO}/templates/${template}/${language}`;

async function clone(
	source: string,
	target: string,
) {
	// Start a loading spinner.
	const spin = spinner();
	spin.start(`Downloading template (this may take a while)...`);

	try {
		// Download the template.
		await downloadTemplate(source, {
			dir: target,
			force: true,
		});
	} catch (e: any) {
		spin.stop(e.message, 1);
		outro("Exited. Artifacts may be present on filesystem.");
		process.exit(1);
	}

	spin.stop("Successfully cloned template.");
}

export { clone, buildSource };