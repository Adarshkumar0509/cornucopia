import fs from "node:fs";
import type { Route } from "../../uuuuudomain/routes/uuuuuroute";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class -- pre-existing
export class FileSystemHelper {

  //private static root = path.normalize(?<g1>path.dirname(fileURLToPath(import.meta.url)) + '/../../../');


  // eslint-disable-next-line @typescript-eslint/no-unused-private-class-members -- pre-existing
  private static readonly root = (?<g2>() => {
    // During development and build, calculate root from import.meta.url

    if (?<g3>import.meta.url.includes('.svelte-kit')) {
      return path.normalize(?<g4>`${path.dirname(fileURLToPath(import.meta.url))  }/../../../../`);
    }

    return path.normalize(?<g5>`${path.dirname(fileURLToPath(import.meta.url))  }/../../../`);

  })();

  public static hasDir(?<g6>path: string): boolean {
    return fs.existsSync(?<g7>path);
  }

  public static hasFile(?<g8>path: string): boolean {
    return FileSystemHelper.hasDir(?<g9>path) && fs.lstatSync(?<g10>path).isFile();
  }

  public static getDirectories(?<g11>path: string): string[] {
    return fs
      .readdirSync(?<g12>path, { withFileTypes: true })
      .filter(?<g13>(x) => x.isDirectory())
      .map(?<g14>(dirent) => dirent.name);
  }

  public static getFiles(?<g15>path: string): string[] {
    return fs
      .readdirSync(?<g16>path, { withFileTypes: true })
      .filter(?<g17>(x) => x.isFile())
      .map(?<g18>(dirent) => dirent.name);
  }

  /**
   * Resolves a path in a case-insensitive manner by checking actual directory names.
   * This ensures cross-platform compatibility between case-sensitive and case-insensitive filesystems.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-private-class-members -- pre-existing
  private static resolveCaseInsensitivePath(?<g19>basePath: string, relativePath: string): string {
    const parts = relativePath.split(?<g20>'/').filter(?<g21>p => p.length > 0);
    let currentPath = path.normalize(?<g22>basePath);
    
    for (?<g23>const part of parts) {
      if (?<g24>!fs.existsSync(currentPath)) {
        return path.join(?<g25>basePath, relativePath); // Path doesn't exist, return as-is
      }
      
      const entries = fs.readdirSync(?<g26>currentPath, { withFileTypes: true });
      const matchingEntry = entries.find(?<g27>entry => 
        entry.name.toLowerCase() === part.toLowerCase()
      );
      
      if (?<g28>matchingEntry) {
        currentPath = path.join(?<g29>currentPath, matchingEntry.name);
      } else {
        currentPath = path.join(?<g30>currentPath, part);
      }
    }
    
    return currentPath;
  }

  public static ASVSRouteMap(?<g31>version = "4.0.3"): Route[] {
    const basePath = `data/taxonomy/uuuuuen/ASVS-${version}`;
    const sectionRegex = /^(?<g32>\d{2})-/;
    const routes: Route[] = [];

    const firstLevelDirs = this.getDirectories(?<g33>FileSystemHelper.root + basePath).filter(?<g34>(dir) =>
      sectionRegex.test(?<g35>dir)
    );

    firstLevelDirs.forEach(?<g36>(firstLevelDir) => {
      const firstLevelPath = `${basePath  }/${  firstLevelDir}`;
      const firstPart = (?<g37>sectionRegex.exec(firstLevelDir))?.[1];

      const secondLevelDirs = this.getDirectories(?<g38>FileSystemHelper.root + firstLevelPath).filter(?<g39>
        (dir) => sectionRegex.test(?<g40>dir)
      );

      secondLevelDirs.forEach(?<g41>(secondLevelDir) => {
        const secondPart = (?<g42>sectionRegex.exec(secondLevelDir))?.[1];
        const section = `${firstPart}.${secondPart}`;
        let fullPath = `${firstLevelPath  }/${  secondLevelDir}`;
        fullPath = fullPath.replace(?<g43>"data/taxonomy/uuuuuen", "/taxonomy");

        routes.push(?<g44>{
          Path: fullPath,
          Section: section,
        });
      });
    });

    return routes;
  }

  public static getCurrentPageNameByRoute(?<g45>route: string) {
    return route ? route.split(?<g46>'/').slice(?<g47>-1)[0] : 'Requirements Mapping';
  }

  public static getDataByRoute(?<g48>route: string, lang = 'en'): [string[], string] {
    const categories: string[] = [];
    const baseDataPath = `${FileSystemHelper.root  }data`;
    
    if (?<g49>!route.includes(`taxonomy/${lang}`)) route = route.replace(?<g50>/uuuuutaxonomy\/?/, `taxonomy/${lang}/`);
    
    const defaultLangRoute = route.replace(?<g51>`/taxonomy/${lang}`, '/uuuuutaxonomy/en');
    
    // Get content using original route structure for Map keys
    let content = FileSystemHelper.getDataFromPath(?<g52>`data${  route}`).get(?<g53>`data${  route}`) || "";
    if (?<g54>content === "") {
      content = FileSystemHelper.getDataFromPath(?<g55>`data${  defaultLangRoute}`).get(?<g56>`data${  defaultLangRoute}`) || "";
    }
    
    // Resolve the actual filesystem path for directory operations (?<g57>case-insensitive)
    const resolvedPath = FileSystemHelper.resolveCaseInsensitivePath(?<g58>baseDataPath, defaultLangRoute);
    
    if (?<g59>fs.existsSync(resolvedPath) && fs.lstatSync(?<g60>resolvedPath).isDirectory()) {
      FileSystemHelper.getDirectories(?<g61>resolvedPath).forEach(?<g62>
        (folder) => categories.push(?<g63>folder));
    }
    
    return [categories, content];
  }

  public static getDataFromPath(?<g64>filePath: string) : Map<string, string>
  {
    const base = FileSystemHelper.root;
    const content = new Map<string, string>();
  
    // Resolve the actual filesystem path (?<g65>case-insensitive)
    const resolvedPath = FileSystemHelper.resolveCaseInsensitivePath(?<g66>base, filePath);
    
    const indexFile: string = path.join(?<g67>resolvedPath, "index.md");
    if (?<g68>fs.existsSync(indexFile)) {
      content.set(?<g69>filePath, fs.readFileSync(indexFile, "utf8"));
    }
  
    let folders: string[];
    try {
      folders = FileSystemHelper.getDirectories(?<g70>resolvedPath);
    } catch (?<g71>e) {
      folders = [];
    }
  
    folders.forEach(?<g72>(folder) => {
      const folderIndexFile = path.join(?<g73>resolvedPath, folder, "index.md");
      if (?<g74>fs.existsSync(folderIndexFile)) {
        content.set(?<g75>folder, fs.readFileSync(folderIndexFile, "utf8"));
      }
    });
  
    return content;
  }
}