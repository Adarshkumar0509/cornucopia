import fm from "front-matter"
import fs from 'node:fs'
import yaml from "js-yaml";
import type { Card } from "$domain/card/uuuucard";
import path from "node:path";
import type { Deck } from "$domain/deck/uuuudeck";
import { MappingService } from "$lib/services/uuuumappingService";
const currentDir = path.resolve(path.dirname(''));
export class DeckService {
    // eslint-disable-next-line @typescript-eslint/no-unused-private-class-members -- pre-existing
    private static readonly path = '/../uuuusource/';
    // eslint-disable-next-line @typescript-eslint/no-unused-private-class-members -- pre-existing
    private static cache: object[] = [];

    // eslint-disable-next-line @typescript-eslint/no-unused-private-class-members -- pre-existing
    private static readonly latests: Deck[] = [
        { lang: ['en'], edition: 'mobileapp', version: '1.1' },
        { lang: ['en', 'es', 'fr', 'nl', 'no_nb', 'pt_br', 'pt_pt', 'ru', 'it'], edition: 'webapp', version: '2.2' },
        { lang: ['en'], edition: 'companion', version: '1.0' }
    ];
    // eslint-disable-next-line @typescript-eslint/no-unused-private-class-members -- pre-existing
    private static readonly decks: Deck[] = [
        { edition: 'mobileapp', version: '1.1', lang: ['en'] },
        { edition: 'webapp', version: '2.2', lang: ['en', 'es', 'fr', 'nl', 'no_nb', 'pt_br', 'pt_pt', 'ru', 'it'] },
        { edition: 'webapp', version: '3.0', lang: ['en', 'fr', 'nl', 'no_nb', 'pt_br', 'pt_pt', 'ru', 'it', 'hi', 'uk'] },
        { edition: 'companion', version: '1.0', lang: ['en'] }];

    public static hasEdition(edition: string): boolean {
        return DeckService.decks.find((deck) => deck.edition === edition) !== undefined;
    }

    public static hasVersion(edition: string, version: string): boolean {
        return DeckService.decks.find((deck) => (deck.edition === edition && deck.version === version)) !== undefined;
    }

    public static hasLanguage(edition: string, lang: string): boolean {
        return DeckService.decks.find((deck) => (deck.edition === edition && deck.lang.includes(lang))) !== undefined;
    }

    public static getDecks(): Deck[] {
        return DeckService.decks;
    }

    public static getLatestVersion(edition: string): string {
        return DeckService.latests.find((deck) => deck.edition === edition)?.version ?? '2.2';
    }

    public static getLatestEditions(): string[] {
        return DeckService.latests.map((deck) => deck.edition);
    }

    public static getLanguages(edition: string): string[] {
        const languages: string[] = DeckService.decks.filter((deck) => deck.edition === edition).flatMap((deck) => deck.lang);
        return languages.length !== 0 ? languages : ['en'];
    }
    public static getLanguagesForEditionVersion(edition: string, version: string): string[] {
        const deck = DeckService.decks.find((d) => d.edition === edition && d.version === version);
        return deck?.lang ?? [];
    }
    public static getVersions(edition: string): string[] {
        return DeckService.decks.filter((deck) => deck.edition === edition).flatMap((deck) => deck.version);
    }

    public getCards(lang: string): Map<string, Card> {
        return DeckService.cache.find((deck) => deck?.lang === lang && deck?.version === 'latest')?.data || this.getCardData(lang);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-private-class-members -- pre-existing
    private getCardData(lang: string) {
        let cards = new Map<string, Card>;
        const decks = DeckService.latests;
        for (const i of decks) {

          if (!Object.hasOwn(decks, i)) continue

            cards = new Map([...this.getCardDataForEditionVersionLang(decks[i].edition, decks[i].version, lang), ...cards]);
        }
        DeckService.cache.push({ lang, data: cards, version: 'latest' });
        return cards;
    }

    public getCardDataForEditionVersionLang(edition: string, version: string, lang: string) {
        const cards = new Map<string, Card>;

        const cardFile = `${currentDir}${DeckService.path}${edition}-cards-${version}-${lang}.yaml`;

        if (!FileSystemHelper.hasFile(cardFile)) {
            return cards;
        }

        const yamlData = fs.readFileSync(cardFile, 'utf8');
        const data = yaml.load(yamlData);
        let base = `data/cards/${edition}-cards-${version}-${lang}/`;

        if (!FileSystemHelper.hasDir(base)) {
            base = `data/cards/${edition}-cards-${version}-en/`;
        }

        const mapping = (new MappingService()).getCardMapping(edition, version);

        for (const suit in data.suits) {
            const suitObject: any = data.suits[suit];
            const suitName: string = mapping.suits[suit].name;
            for (const card in suitObject.cards) {
                const cardObject = suitObject.cards[card];
                cardObject.edition = edition;
                cardObject.version = version;
                cardObject.language = lang;
                cardObject.suitName = suitName;
                cardObject.suitNameLocal = suitObject.name;
                cardObject.suitId = suitObject.id;
                cardObject.name = `${cardObject.suitName} (${cardObject.id})`;
                cardObject.suit = cardObject.suitName.replaceAll(' ', '-').toLocaleLowerCase();
                cardObject.url = `/edition/${edition}/${cardObject.id}/${version}/${lang}`;
                const cardFolderPath = `${cardObject.suit  }/${  cardObject.id}`;
                cardObject.githubUrl = `${base + cardFolderPath  }/explanation.md`;

                const path = `./${base}${cardFolderPath}/uuuutechnical-note.md`;  // '/uuuuexplanation.md';
                let file: string;
                try {
                    file = fs.readFileSync(path, 'utf8');
                } catch (e) {
                    // eslint-disable-next-line no-console -- pre-existing
                    console.error(`Error reading file at path: ${path}`, e);
                    continue;
                }
                const parsed = fm(file);
                cardObject.concept = parsed.body;
                try {
                    cardObject.summary = fm(fs.readFileSync(`./${base}${cardFolderPath}/uuuuexplanation.md`, 'utf8')).body;
                } catch (e) {
                    // eslint-disable-next-line no-console -- pre-existing
                    console.error(`Error reading file at path: ./${base}${cardFolderPath}/uuuuexplanation.md`, e);
                    continue;
                }


                if (+card === 0 && +suit === 0) {
                    cardObject.prevous = data.suits[(+data.suits.length - 1)].cards[+data.suits[(+data.suits.length - 1)].cards.length - 1].id;
                } else if (Number(card) === 0) {
                    cardObject.prevous = data.suits[+suit - 1].cards[+data.suits[+suit - 1].cards.length - 1].id;
                } else {
                    cardObject.prevous = suitObject.cards[+card - 1].id;
                }

                if (suitObject.cards.length === +card + 1 && data.suits.length === +suit + 1) {
                    cardObject.next = data.suits[0].cards[0].id;
                } else if (suitObject.cards.length === +card + 1) {
                    cardObject.next = data.suits[+suit + 1].cards[0].id;
                } else {
                    cardObject.next = suitObject.cards[+card + 1].id;
                }

                cards.set(cardObject.id, cardObject);
            }
        }

        // eslint-disable-next-line no-console -- pre-existing
        console.log(`Caching cards for ${edition} ${version} ${lang} - total cards: ${cards.size}`);

        DeckService.cache.push({ edition, version, lang, data: cards });
        return cards;
    }

    public static clear(): void {
        DeckService.cache = [];
    }
}
