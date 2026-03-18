import {data} from '$lib/devguide'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class -- pre-existing
export class DevGuideMapping {

    public static getUrl(code : string) : string
    {
        return data[code.replaceAll(/[0-9-]+/ugu,"") as keyof typeof data] || "";
    }
}