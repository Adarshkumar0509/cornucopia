import fs from 'node:fs'
import yaml from "js-yaml";
import path from "node:path";
import { DeckService } from "$lib/services/deckService";
const currentDir = path.resolve(path.dirname(''));
 
export class MappingService {
     
    private static mappings: object[] = [];
     
    private static readonly path = '/../source/';

    public getLatestsCardMappingData(edition: string)
    {
        const yamlData = fs.readFileSync(`${currentDir}${MappingService.path}${edition}-mappings-${DeckService.getLatestVersion(edition)}.yaml`, 'utf8');
        const data = yaml.load(yamlData);
        MappingService.mappings.push({edition, version: 'latests', data});
        return data;
    }

    public getCardMapping(edition: string, version: string) : any
    {
        return this.getCardMappingForAllVersions().get(`${edition}-${version}`);
    }

    public getCardMappingDataAllVersions()
    {
        DeckService.getDecks().forEach((deck) => {
            const yamlData = fs.readFileSync(`${currentDir}${MappingService.path}${deck.edition}-mappings-${deck.version}.yaml`, 'utf8');
            const data = yaml.load(yamlData);
            MappingService.mappings.push({edition: deck.edition, version: deck.version, data});
        });
        
        return MappingService.mappings;
    }

    public getCardMappingForLatestEdtions() : Map<string, any>
    {
        const decks = new Map<string, any>();
        DeckService.getLatestEditions().forEach((edition) => {
            decks.set(
                edition, MappingService.mappings.find((mapping) => mapping !== null && mapping !== undefined && (mapping as any).version === 'latests' && (mapping as any).edition === edition)?.data || this.getLatestsCardMappingData(edition)
            );

            
        });
        return decks;
    }

    public getCardMappingForAllVersions() : Map<string, any>
    {
        const mapping = new Map<string, any>();
        
        // Load all mappings if not already loaded
        if (MappingService.mappings.length === 0) {
            this.getCardMappingDataAllVersions();
        }
        
        DeckService.getDecks().forEach((deck) => {
            let mappingData = MappingService.mappings.find((mapping) => (mapping as any).version === deck.version && (mapping as any).edition === deck.edition)?.data;
            
            // If not found in cache, try to load it
            if (mappingData === null || mappingData === undefined) {
                try {
                    const yamlData = fs.readFileSync(`${currentDir}${MappingService.path}${deck.edition}-mappings-${deck.version}.yaml`, 'utf8');
                    mappingData = yaml.load(yamlData);
                    MappingService.mappings.push({edition: deck.edition, version: deck.version, data: mappingData});
                } catch (e) {
                    // eslint-disable-next-line no-console -- pre-existing
                    console.error(`Failed to load mapping for ${deck.edition}-${deck.version}:`, e);
                }
            }
            
            if (mappingData !== null && mappingData !== undefined) {
                mapping.set(`${deck.edition}-${deck.version}`, mappingData);
            }
        });
        return mapping;
    }

    public static clear(): void
    {
        MappingService.mappings = [];
    }
}