import { FileSystemHelper } from '$lib/filesystem/fileSystemHelper';
import path from "node:path";

/** @type {import('./$types').PageServerLoad} */
export function load({ url }) {
  const lang = 'en';
  const [categories, content] = FileSystemHelper.getDataByRoute(url.pathname, lang);

  // Resolve the canonical path for GitHub links
  let route = url.pathname;
  if (!route.includes(`taxonomy/${lang}`)) route = route.replace(/utaxonomy\/?/, `taxonomy/${lang}/`);

  // Resolve actual casing using FileSystemHelper
  // @ts-expect-error --  -- pre-existing type issue
  const baseDataPath = path.join(FileSystemHelper.root, "data");
  // @ts-expect-error --  -- pre-existing type issue
  const resolvedFullPath = FileSystemHelper.resolveCaseInsensitivePath(baseDataPath, route);
  // @ts-expect-error --  -- pre-existing type issue
  const truePath = path.relative(FileSystemHelper.root, resolvedFullPath).replace(/\\/gu, '/');

  return {
    categories,
    content,
    path: url.pathname,
    truePath,
    title: FileSystemHelper.getCurrentPageNameByRoute(url.pathname as string),
    timestamp: new Date().toUTCString(),
  };
}
