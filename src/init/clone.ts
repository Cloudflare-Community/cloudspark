import degit from "degit";
import { log, outro, spinner } from "@clack/prompts";

export default async function clone(repo: string, target: string) {
	// Start a loading spinner.
	const spin = spinner();
	spin.start("Cloning template...");

	// Create a degit emitter.
	const emitter = degit(repo, {
		cache: false,
		force: true
	});

	// Clone the repo.
	emitter.on("warn", (warning) => log.warn(warning.message));
	try {
		await emitter.clone(target);
	} catch (e: any) {
		spin.stop();
		log.error(e.message);
		outro("Cancelled. Artifacts may be present.");
		process.exit(1);
	}
	spin.stop("Successfully cloned template.");
}