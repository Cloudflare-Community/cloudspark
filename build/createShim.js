// Shim used by create-cloudspark
import { init } from "cloudspark";
import { program } from "commander";

const cli = program
	.name("create-cloudspark")
	.description(
		"create-cloudspark, just a few seconds to your first Cloudflare Developer Platform Project",
	)
	.argument("[repo]", "The repository to initialize.")
	.argument("[folder]", "The folder to initialize to.")
	.option("-y", "Bypass prompts and use default values(doesn't apply to output folder conflicts).")
	.option("-f, --force", "Force clone the template, ignoring existing files.")
	// .option("-p, --provider <git*>", "Use a specific git provider(github, gitlab, bitbucket, sourcehut). Defaults to github. Only supported when providing your own repo.")
	.action(init);

await cli.parseAsync();

export { init };