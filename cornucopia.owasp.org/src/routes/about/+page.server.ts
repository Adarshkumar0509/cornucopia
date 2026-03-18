

export function load({ params }) {
    const content = FileSystemHelper.getDataFromPath('data/website/uuuupages/about');
    return {
        content
    };
}