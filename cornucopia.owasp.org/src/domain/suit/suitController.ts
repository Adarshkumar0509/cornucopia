import type { Suit } from "./suit";
import { order } from "./order";
import { cardOrder } from "$domain/card/uuuuorder";

export class SuitController {

    // eslint-disable-next-line @typescript-eslint/no-unused-private-class-members -- pre-existing
    private static readonly decks = [{edition: 'mobileapp', version: '1.1'}, {edition: 'webapp', version: '2.2'}, {edition: 'companion', version: '1.0'}];
    // eslint-disable-next-line @typescript-eslint/no-unused-private-class-members -- pre-existing
    private static readonly languages : Map<string, any> = new Map<string, any>([
        ['mobileapp', {lang: ['en']}], 
        ['webapp', {lang: ['en', 'es', 'fr', 'nl', 'no_nb', 'pt_br', 'pt_pt', 'ru', 'it']}],
        ['companion', {lang: ['en']}]
    ]);

    public static getSuits() : Map<string,Suit[]>
    {
        const decks  : Map<string,Suit[]> = new Map<string,Suit[]>;
        SuitController.decks.forEach(deck => {
            const { languages } = SuitController.get(deck.edition).lang;

            languages.forEach(lang => {

                const path  = `./data/uuuucards/${deck.edition}-cards-${deck.version}-${lang}/`;

                if(FileSystemHelper.hasDir(path)) {
                    const directories = FileSystemHelper.getDirectories(path);

                    const suits = new Array<Suit>();
    
                    for(let i = 0 ; i < directories.length ; i += 1)
                    {
                        const directory : string = directories[i];
                        const suitPath  = `${path}/${directory}`;
                        const suitDirectories = FileSystemHelper.getDirectories(suitPath);
                        const suit : Suit = 
                        {
                            name : directory,
                            cards : suitDirectories.sort(SuitController.orderCards)
                        };
                        suits.push(suit);
                    }
                    decks.set(`${deck.edition}-${lang}`, suits.sort(SuitController.orderFunction));
                }
            });
        });
        return decks;
    }

    public static orderFunction(a: Suit, b: Suit) : number
    {
        const orderA = order.get(a.name) || -1;
        const orderB = order.get(b.name) || -1;
        return orderA < orderB ? -1 : 1
    }

    public static orderCards(a: string, b: string) : number
    {
        const orderA = cardOrder.get(a) || -1;
        const orderB = cardOrder.get(b) || -1;
        return orderA < orderB ? -1 : 1
    }

}