import { getAuthors } from '../../domain/author/authorController.js'

export function load({params})
{
    return {
        authors : getAuthors()
    }
}