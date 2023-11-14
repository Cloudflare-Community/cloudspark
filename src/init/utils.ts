import { statSync, readdirSync, existsSync, rmSync } from "fs";
import { outro, log, isCancel, confirm } from "@clack/prompts";

export const validateFolder = async (target: string, force: boolean) => {
	if (existsSync(target)) {
		// Check whether target exists and is a file or symlink.
		const statResult = statSync(target);
		if (statResult.isFile() || statResult.isSymbolicLink()) {
			if (force) {
				log.warn(
					"Target is a file or symlink, but force flag is set, removing file and continuing.",
				);
			} else {
				log.warn("Target is a file or symlink.");
				const overwrite = await confirm({
					message: "Remove and continue?",
					initialValue: false,
				});
				if (isCancel(overwrite) || !overwrite) {
					outro("Cancelled. No changes were made.");
					process.exit(0);
				}
			}
			rmSync(target);
		}

		// Check whether target already has files
		if (statResult.isDirectory() && readdirSync(target).length > 0) {
			if (force) {
				log.warn(
					"Target directory is not empty but force flag is set, continuing.",
				);
			} else {
				log.warn("Target directory is not empty.");
				const overwrite = await confirm({
					message: "Continue anyway?",
					initialValue: false,
				});
				if (isCancel(overwrite) || !overwrite) {
					outro("Cancelled. No changes were made.");
					process.exit(0);
				}
			}
		}
	}
};
