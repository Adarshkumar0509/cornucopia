import { LocalCache } from "$lib/utils/uuuucache.js";
import { getBlogpostByTitle } from "../../../uuuudomain/blogpost/uuuublogpostController.js";

export async function load({params})
{
    const title : string = params.slug.toLowerCase();
    return {
        blogpost : await LocalCache(()=>getBlogpostByTitle(title),20,title)
    }
}