import { FileSystemHelper } from '$lib/filesystem/fileSystemHelper';


export function load({ params }) {
    const content = FileSystemHelper.getDataFromPath('data/website/pages/about');
    return {
        content
    };
}