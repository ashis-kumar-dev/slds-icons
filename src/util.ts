import AdmZip from "adm-zip";
import { MarkdownString } from "vscode";

export const IconNameAttrName = 'icon-name';
export const IconNameAttrNameMatcher = new RegExp(`${IconNameAttrName}="\\w+:\\w+"`);
export function extractIconName(text: string): string | null {
    // Regular expression to match the pattern icon-name="<value>"
    const regex = new RegExp(`${IconNameAttrName}="([^"]+)"`);
    const match = text.match(regex);
    if (match && match[1]) {
        return match[1];
    }
    return null;
}
function getIconFileName(iconName: string) {
    return `${iconName.replace(":", "/")}.svg`;
}
export function getIconSvgContent(iconName: string, reader: AdmZip) {
    const iconFileName = getIconFileName(iconName);
    const iconFile = reader.getEntry(iconFileName);
    if (!iconFile) { return null; }
    const data = iconFile.getData().toString('utf-8');
    return data;
}