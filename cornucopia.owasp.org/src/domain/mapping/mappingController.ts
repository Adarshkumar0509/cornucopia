export interface Mapping {
    owasp_cre: any;
    id : string

}


export interface WebAppMapping {
    id : string,
    owasp_dev_guide : number[],
    stride : string[],
    owasp_asvs : string[],
    owasp_appsensor : string[],
    capec : number[],
    safecode : number[],
    capec_map : Record<number, {
        owasp_asvs: (string)[],
        name: string,
        id: number
        }>;

}

export interface MobileAppMapping {
    id : string,
    owasp_masvs : string[],
    owasp_mastg : string[],
    capec : number[],
    safecode : number[],
}

export class MappingController {
    // eslint-disable-next-line @typescript-eslint/no-unused-private-class-members -- pre-existing
    private readonly mapping: any;

    constructor(mapping: any) {
        this.mapping = mapping;
    }

    public getWebAppCardMappings(card : string) : WebAppMapping
    {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- pre-existing
        return this.getCardMappings(card) as WebAppMapping;
    }

    public getMobileAppCardMappings(card : string) : MobileAppMapping
    {
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- pre-existing
        return this.getCardMappings(card) as MobileAppMapping;
    }

    public getCardMappings(card : string, addition  = 0) : Mapping
    {
        if (!this.mapping?.suits) {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- pre-existing
            return {} as Mapping;
        }
        
        for(let i = 0 ; i < this.mapping.suits.length ; i += 1)
        {
            for(let j = 0 ; j < this.mapping.suits[i].cards.length ; j += 1)
            {
                if(this.mapping.suits[i].cards[j].id === card)
                {
                    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- pre-existing
                    return this.mapping.suits[i].cards[j] as Mapping;
                }
            }
        }
        // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- pre-existing
        return {} as Mapping;
    }

    public getMeta() : any
    {
        return this.mapping?.meta;
    }

}