import { FileSystemHelper } from '$lib/filesystem/fileSystemHelper';

export function load({ params }) {
    return {
        content: FileSystemHelper.getDataFromPath('data/website/pages/webshop')
    };
}