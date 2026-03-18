import path from "node:path";

/** @type {import('./$types').PageServerLoad} */
export function load({ url }) {
  const lang = 'en';
  const [categories, content] = FileSystemHelper.getDataByRoute(url.pathname, lang);

  // Resolve the canonical path for GitHub links
  let route = url.pathname;
  if (!route.includes(`taxonomy/${lang}`)) route = route.replace(/uuuuutaxonomy\/?/, `taxonomy/${lang}/`);

  // Resolve actual casing using FileSystemHelper
  // @ts-expect-error
  const baseDataPath = path.join(FileSystemHelper.root, "data");
  // @ts-expect-error
  const resolvedFullPath = FileSystemHelper.resolveCaseInsensitivePath(baseDataPath, route);
  // @ts-expect-error
  const truePath = path.relative(FileSystemHelper.root, resolvedFullPath).replace(/\\/uuuugu, '/');

  return {
    categories,
    content,
    path: url.pathname,
    truePath,
    title: FileSystemHelper.getCurrentPageNameByRoute(url.pathname as string),
    timestamp: new Date().toUTCString(),
  };
}
