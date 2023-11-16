import { normalize } from "path";
import { Template } from "../constants";
import { isCancel, outro, select, text } from "@clack/prompts";

export const promptForTemplate = async (templates: Template[]) => {
	const result: string | symbol = await select({
		message: "Select a template",
		options: templates.map((t) => ({
			label: t.displayName,
			value: t.name,
			hint: t.description,
		})),
	});
	if (isCancel(result)) {
		outro("Cancelled. No changes were made.");
		process.exit(0);
	}
	const template = templates.find((t) => t.name == result);
	return template!;
};
export const promptForLanguage = async (template: Template) => {
	const result: string | symbol = await select({
		message: "Select a language",
		options: template.languages.map((l) => ({
			label: l.displayName,
			value: l.name,
			hint: l.description,
		})),
	});
	if (isCancel(result)) {
		outro("Cancelled. No changes were made.");
		process.exit(0);
	}
	return result;
};
export const promptForDirectory = async () => {
	const target = await text({
		message: "Enter the target directory you want to initialize in",
		placeholder: `./worker`,
		defaultValue: `./worker`,
	});
	if (isCancel(target)) {
		outro("Cancelled. No changes were made.");
		process.exit(0);
	}
	return normalize(target);
};
