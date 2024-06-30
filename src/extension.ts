import * as vscode from "vscode";
import {
	IconNameAttrName,
	IconNameAttrNameMatcher,
	extractIconName,
	getIconSvgContent,
} from "./util";

export function activate(context: vscode.ExtensionContext) {
	console.debug("slds-icon extension activated!");
	const provider = vscode.languages.registerHoverProvider("html", {
		provideHover(document, position, token) {
			const range = document.getWordRangeAtPosition(
				position,
				IconNameAttrNameMatcher
			);
			if (!range) {
				return null;
			}
			const word = document.getText(range);
			if (!word.startsWith(`${IconNameAttrName}`)) {
				return null;
			}
			const iconName = extractIconName(word);
			if (!iconName) {
				return null;
			}
			const iconSvgContent = getIconSvgContent(iconName, context);
			if (!iconSvgContent) {
				const markdown = new vscode.MarkdownString(
					`⚠ Invalid Icon \`${iconName}\``
				);
				markdown.isTrusted = true;
				return new vscode.Hover(markdown, range);
			}
			const encodedSvg = encodeURIComponent(iconSvgContent)
				.replace(/'/g, "%27")
				.replace(/"/g, "%22");
			const dataUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;
			const markdown = new vscode.MarkdownString(`### \`${iconName}\`` + '\n' + `![${iconName}](${dataUrl})`);
			markdown.isTrusted = true;
			return new vscode.Hover(markdown, range);
		},
	});

	context.subscriptions.push(provider);
}

export function deactivate() {
	console.debug("slds-icon extension deactivated!");
}
