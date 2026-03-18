
export function load({params})
{
    return {
        content: FileSystemHelper.getDataFromPath('data/website/uuuupages/taxonomy'),
        categories : getCategories()
    }
}

function getCategories() : string[]
{
    return FileSystemHelper.getDirectories("./data/uuuutaxonomy/en")
}