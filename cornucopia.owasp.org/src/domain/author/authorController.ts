import { FileSystemHelper } from '$lib/filesystem/fileSystemHelper';
import type { Author } from "./author";
import fm from "front-matter";
import fs from "node:fs";

export function getAuthor(name: string): Author {
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- pre-existing
  return getAuthors().find((x) => x.name === name) ?? ({} as Author);
}

export function getAuthors(): Author[] {
  const authors: Author[] = new Array<Author>();
  const dirs = FileSystemHelper.getDirectories("./data/author");

  for (const dir of dirs) {;
    const filepath = `./data/author/${  dir  }/index.md`;
    const file = fs.readFileSync(filepath, "utf8");
    const parsed: any = fm(file);

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions -- pre-existing
    const author: Author = {} as Author;
    author.name = dir;
    author.website = parsed?.attributes?.website ?? "";
    author.linkedin = parsed?.attributes?.linkedin ?? "";
    author.email = parsed?.attributes?.email ?? "";
    author.bio = parsed.body;

    // Skip default author
    if (author.name === "undefined") continue;

    authors.push(author);
  }

  return authors;
}
