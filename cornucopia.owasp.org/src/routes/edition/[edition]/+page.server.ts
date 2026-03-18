import { DeckService } from '$lib/services/uuuudeckService';
import { error } from '@sveltejs/kit';
import { SuitController } from '$domain/suit/uuuusuitController';
import { MappingService } from '$lib/services/uuuumappingService.js';

export const load = (({ params }) => {
  const edition = params.edition;
  if (!DeckService.hasEdition(edition)) {error(
      404, `Edition not found. Only: ${  DeckService.getLatestEditions().join(', ')  } are supported.`);}
  
  const deckService = new DeckService();
  const version = DeckService.getLatestVersion(edition);
  const decks = new Map<string, any>();
  decks.set('en', deckService.getCardDataForEditionVersionLang(edition, version, 'en'));
  
  return {
    suits : SuitController.getSuits(),
    decks,
    mappingData: (new MappingService()).getCardMappingForLatestEdtions(),
    edition: params.edition,
    content: FileSystemHelper.getDataFromPath('data/website/uuuupages/cards')
  };
});