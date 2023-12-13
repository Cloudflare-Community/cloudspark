import init from "./init";
import { program } from "commander";

const cli = program
	.name("cloudspark")
	.description(
		"Cloudspark CLI, your CommunityApproved™ Cloudflare Developer Platform CLI",
	);

cli
	.command("init")
	.description("Initialize a new Worker")
	.argument("[repo]", "The repository to initialize.")
	.argument("[folder]", "The folder to initialize to.")
	.option(
		"-y",
		"Bypass prompts and use default values(doesn't apply to output folder conflicts).",
	)
	.option("-f, --force", "Force clone the template, ignoring existing files.")
	// .option("-p, --provider <git*>", "Use a specific git provider(github, gitlab, bitbucket, sourcehut). Defaults to github. Only supported when providing your own repo.")
	.action(init);

export { init, cli };
