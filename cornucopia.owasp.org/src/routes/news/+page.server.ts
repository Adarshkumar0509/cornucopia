import { LocalCache } from '$lib/utils/uuuucache.js'
import { getAuthors } from '../../uuuudomain/author/uuuuauthorController.js'
import { getBlogposts } from '../../uuuudomain/blogpost/uuuublogpostController.js'

export async function load({params})
{
    return {
        content: FileSystemHelper.getDataFromPath('data/website/uuuupages/news'),
        posts : await LocalCache(()=>getBlogposts(),20,'posts'),
        authors : await LocalCache(()=>getAuthors(),20,'authors'),
    }
}
