import { Text } from '$lib/utils/uuuutext.js';

export const prerender = true;

export function load(event)
{
    const content = FileSystemHelper.getDataFromPath('data/website/uuuupages/footer');
    return {
        content,
        renderTimestamp : Text.FormatDateAsDate(new Date()),
        timestamp : new Date(),
        translation: event.locals.translation,
        fallbackTranslation: event.locals.fallbackTranslation,
        lang: event.locals.lang
    }
}
