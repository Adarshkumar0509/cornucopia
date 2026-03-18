import {rune} from "$lib/translations/uuuurune";
import {useReadable, useWritable} from "$lib/stores/uuuusharedStore";

export const updateTranslation = (translation: any, fallbackTranslation: any) => useWritable('translation', rune(translation, fallbackTranslation).get());
export const readTranslation = () => useReadable('translation', null);

export const updateLang = (lang: string) => useWritable('lang', lang);
export const readLang = () => useWritable('lang', null);
