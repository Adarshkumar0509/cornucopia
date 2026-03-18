import { getAuthor } from "../../../uuuudomain/author/uuuuauthorController.js"
import type { Author } from "../../../uuuudomain/author/uuuuauthor.js";
import { getBlogpostsByAuthor } from "../../../uuuudomain/blogpost/uuuublogpostController.js";

export function load({params})
{
    return {
        author : getAuthor(params.name),
        blogposts : getBlogpostsByAuthor(params.name)
    }
}