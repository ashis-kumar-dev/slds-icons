import AdmZip from 'adm-zip';
import { existsSync } from 'fs';
import { join } from 'path';
import { ExtensionContext } from 'vscode';

export function getZipReader(context: ExtensionContext) {
    let zip: AdmZip | null = null;
    let zipPath = join(context.extensionPath, 'static', 'salesforce-lightning-design-system-icons.zip');
    if (existsSync(zipPath)) { zip = new AdmZip(zipPath); }
    return zip;
}