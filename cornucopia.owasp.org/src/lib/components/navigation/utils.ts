export function AddLink(links: Link[], name : string, href : string)
{
    links.push({name,href}) ;
}

export interface Link {
    name : string,
    href : string
}
