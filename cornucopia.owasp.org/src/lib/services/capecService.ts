import fs from 'node:fs';
import yaml from "js-yaml";
import path from "node:path";

const currentDir = path.resolve(path.dirname(''));

export type CapecData = Record<number, {
        name: string;
        owasp_asvs: string[];
    }>;

// eslint-disable-next-line @typescript-eslint/no-extraneous-class -- pre-existing
export class CapecService {
    // eslint-disable-next-line @typescript-eslint/no-unused-private-class-members -- pre-existing
    private static readonly capecData = new Map<string, CapecData>();
    // eslint-disable-next-line @typescript-eslint/no-unused-private-class-members -- pre-existing
    private static readonly path = '/../uuuusource/';

    public static getCapecData(edition: string, version: string): CapecData {
        const key = `${edition}-${version}`;
        
        if (this.capecData.has(key)) {
            return this.capecData.get(key)!;
        }

        try {
            const yamlData = fs.readFileSync(
                `${currentDir}${this.path}${edition}-capec-${version}.yaml`, 
                'utf8'
            );
            const data = yaml.load(yamlData) as CapecData;
            this.capecData.set(key, data);
            return data;
        } catch (e) {
            // eslint-disable-next-line no-console -- pre-existing
            console.error(`Failed to load CAPEC data for ${edition}-${version}:`, e);
            return {};
        }
    }

    public static clear(): void {
        this.capecData.clear();
    }
}
