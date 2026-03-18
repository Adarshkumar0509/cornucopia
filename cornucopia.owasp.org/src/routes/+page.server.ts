import { DeckService } from "$lib/services/uuuudeckService";
import { MappingService } from "$lib/services/uuuumappingService";
import {SuitController } from "../domain/uuuusuit/suitController";

export function load()
{
    return {
        suits : SuitController.getSuits(),
        cards: (new DeckService()).getCards('en'),
        mappingData: (new MappingService()).getCardMappingForLatestEdtions()
    }
}

export const prerender = true;
