import { getAuthors } from '../../uuuudomain/author/uuuuauthorController.js'

export function load({params})
{
    return {
        authors : getAuthors()
    }
}