import attacks from '$lib/attacks.json'

export interface Card {
    id : string,
    desc : string,
}

export interface Mapping {
    id : string,
    owasp_dev_guide : number[],
    stride : string[],
    owasp_asvs : string[],
    owasp_appsensor : string[],
    capec : number[],
    safecode : number[],

}

export function GetCard(suit : string, card : string) : Card | undefined
{
    // eslint-disable-next-line no-param-reassign -- pre-existing
    suit = parseSuit(suit);

    for(let i = 0 ; i < data.suits.length ; i += 1)
    {
        if(data.suits[i].name.toLowerCase() === suit.toLowerCase())
        {
            for(let j = 0 ; j < data.suits[i].cards.length ; j += 1)
            {
                if(data.suits[i].cards[j].id === card)
                {
                    return data.suits[i].cards[j] as Card;
                }
            }
        }
    }
}

function parseSuit(suit : string) : string
{
    // eslint-disable-next-line no-param-reassign -- pre-existing
    suit = suit.replaceAll("-" , " ");
    return suit;

}

export function GetCardMappings(suit : string, card : string, addition  = 0) : Mapping | undefined
{
    // eslint-disable-next-line no-param-reassign -- pre-existing
    suit = parseSuit(suit);

    for(let i = 0 ; i < mappings.suits.length ; i += 1)
    {
        if(mappings.suits[i].name.toLowerCase() === suit.toLowerCase())
        {
            for(let j = 0 ; j < mappings.suits[i].cards.length ; j += 1)
            {
                if(mappings.suits[i].cards[j].id === card)
                {
                    return mappings.suits[i].cards[j] as Mapping;
                }
            }
        }
    }

    return undefined;
}

export function GetCardDescription(suit : string , card : string) : string
{
    const thisCard : Card | undefined = GetCard(suit,card);
    if(thisCard === undefined)
        {return "";}

    return thisCard.desc
}

export function GetCardExplanation(suit : string , card : string) : string
{
    const thisCard : Card | undefined = GetCard(suit,card);
    if(thisCard === undefined)
        {return "";}

    return thisCard.desc
}

export function GetCardImageUrl(suit : string , card : string, addition  = 0) : string
{
    if(suit === '' || card === '')
        {return "/cards/all/CORNUCOPIA.png";}

    const thisCard : Card | undefined = GetCard(suit,card);

    return `/cards/all/${  thisCard?.id  }.png`;
}

export interface Attack {
    name : string,
    url : string
}

export function GetCardAttacks(card : string) : Attack[]
{
    const id = card;
    const result : Attack[] = []

    for(let i = 0 ; i < attacks.list.length ; i += 1)
    {
        const attack = attacks.list[i];
        for(let j = 0 ; j < attack.cards.length ; j += 1)
        {
            const sampleID = attack.cards[j];
            if(id === sampleID)
            {
                result.push({name : attack.name,url : `../attacks/${  attack.url}`})
            }
        }
    }

    return result
}