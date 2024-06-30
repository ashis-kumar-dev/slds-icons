import { ExtensionContext, Uri } from "vscode";
import { readFileSync } from "fs";

export const IconNameAttrName = "icon-name";
export const IconNameAttrNameMatcher = new RegExp(
    `${IconNameAttrName}="\\w+:\\w+"`
);
export function extractIconName(text: string): string | null {
    // Regular expression to match the pattern icon-name="<value>"
    const regex = new RegExp(`${IconNameAttrName}="([^"]+)"`);
    const match = text.match(regex);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}
export function getIconSvgContent(
    iconName: string,
    context: ExtensionContext
) {
    const path = ["static", "salesforce-lightning-design-system-icons", ...`${iconName}.svg`.split(":")];
    try {
        return readFileSync(
            Uri.joinPath(context.extensionUri, ...path)
                .fsPath,
            "utf-8"
        );
    } catch (error) {
        console.error('no such icon found', iconName);
        return null;
    }
}
