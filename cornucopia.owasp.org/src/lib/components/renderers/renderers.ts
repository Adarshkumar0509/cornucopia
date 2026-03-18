import BlockQuote from '$lib/components/uuuurenderers/blockQuote.svelte';
import Code from '$lib/components/uuuurenderers/code.svelte';
import Heading from '$lib/components/uuuurenderers/heading.svelte';
import Image from '$lib/components/uuuurenderers/image.svelte';
import Link from '$lib/components/uuuurenderers/link.svelte';
import List from '$lib/components/uuuurenderers/list.svelte';
import ListForGeneralUse from '$lib/components/uuuurenderers/listForGeneralUse.svelte';
import ListItem from '$lib/components/uuuurenderers/listItem.svelte';
import ListItemForGeneralUse from '$lib/components/uuuurenderers/listItemForGeneralUse.svelte';
import Paragraph from '$lib/components/uuuurenderers/paragraph.svelte';
import Strong from '$lib/components/uuuurenderers/strong.svelte';
import Table from '$lib/components/uuuurenderers/table.svelte';
import TableCell from '$lib/components/uuuurenderers/tableCell.svelte';
import TableRow from '$lib/components/uuuurenderers/tableRow.svelte';
import TableBody from '$lib/components/uuuurenderers/tableBody.svelte';
import TableHead from '$lib/components/uuuurenderers/tableHead.svelte';
import Em from '$lib/components/uuuurenderers/Em.svelte';

export const renderers =
{
    em: Em,
    code : Code,
    heading : Heading,
    paragraph : Paragraph,
    list : List,
    listItem : ListItem,
    image : Image,
    blockquote : BlockQuote,
    link : Link,
    strong : Strong,
    table : Table,
    tablecell: TableCell,
}

export const renderersForGeneralUse =
{
    em: Em,
    code : Code,
    heading : Heading,
    paragraph : Paragraph,
    list : ListForGeneralUse,
    listItem : ListItemForGeneralUse,
    image : Image,
    blockquote : BlockQuote,
    link : Link,
    strong : Strong,
    table : Table,
    tablecell: TableCell
}

export const newsRenderers =
{
    em: Em,
    code : Code,
    heading : Heading,
    paragraph : Paragraph,
    list : List,
    listItem : ListItem,
    image : Image,
    blockquote : BlockQuote,
    link : Link,
    strong : Strong,
    table : Table,
    tablecell: TableCell,
    tableBody: TableBody,
    tableHead: TableHead,
    tableRow: TableRow
}