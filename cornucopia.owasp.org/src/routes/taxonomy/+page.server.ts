import { FileSystemHelper } from '$lib/filesystem/fileSystemHelper';

export function load({params})
{
    return {
        content: FileSystemHelper.getDataFromPath('data/website/pages/taxonomy'),
        categories : getCategories()
    }
}

function getCategories() : string[]
{
    return FileSystemHelper.getDirectories("./data/taxonomy/en")
}