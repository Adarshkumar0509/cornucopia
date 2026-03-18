import type { Card } from "../card/card";
import type { MappingController } from "../mapping/mappingController";

export interface Cre {
    doctype: string; 
    name: any; 
    section: string; 
    description: string; 
    sectionID: string; 
    hyperlink: string; 
    links: CreLink[];
    tags: never[];
    tooltype: string;
}

export interface CreLink {
    document: CreDocument;
    ltype: string;
}

export interface CreDocument {
    doctype: string;
    id: string;
}


export class CreController {
     
    private readonly deck: Map<string, Card>;
     
    private readonly controller: MappingController;

     
    private static readonly editions: Map<string, string>  = new Map<string, string>( [
        ['webapp', "OWASP Cornucopia Website App Edition"],
        ['mobileapp', "OWASP Cornucopia Mobile App Edition"]

    ]);

     
    private static readonly category: Map<string, string>  = new Map<string, string>( [
        ['webapp', "Website Application"],
        ['mobileapp', "Mobile Application"]

    ]);

    constructor(deck: Map<string, Card>, controller: MappingController) {
        this.deck = deck;
        this.controller = controller;
    }

    public static getEditionName(edition: string): string {
        return CreController.editions.get(edition) ?? edition;
    }

    public getCreMapping(edition: string, lang: string) : any {
        if (!CreController.editions.has(edition)) return {"meta": {}, "standards": []};
        const standards: Cre[] = [];
        this.deck.forEach(
                (card: Card) => (card.edition === edition) && standards.push(this.generateDoc(card))
            );
        return {
            "meta": {
                "edition": CreController.editions.get(edition),
                "component": 'cards',
                "language": lang,
                "version": this.controller.getMeta()?.version
            },
            standards
        };
    }

    public generateDoc(card: Card) {
        const mapping = this.controller.getCardMappings(card.id);
        const links: Array<{ document: { doctype: string; id: string }; ltype: string }> = [];
        const cre = (mapping.owasp_cre?.owasp_asvs as string[]) ?? []
        cre.forEach((cre) => links.push({
            "document": {
                "doctype": "CRE",
                "id": cre
            },
            "ltype": "Linked To"
        }));
        return {
            "doctype": "Tool",
            "id": `https://cornucopia.owasp.org${  card.url}`,
            "name": CreController.editions.get(card.edition),
            "section": card.suitNameLocal,
            "description": card.desc,
            "sectionID": card.id,
            "hyperlink": `https://cornucopia.owasp.org${  card.url}`,
            links,
            "tags": ["Threat modeling", CreController.category.get(card.edition)],
            "tooltype": "Defensive"
        };
    }
}
