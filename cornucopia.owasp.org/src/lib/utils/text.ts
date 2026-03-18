
// eslint-disable-next-line @typescript-eslint/no-extraneous-class -- pre-existing
export class Text
{
    public static Capitalize(input : string)
    {
        const words = input.split(" ");

        for (const i of words) {
            words[i] = words[i].slice(0,1).toUpperCase() + words[i].slice(1,input.length);
        }

        return words.join(" ").replaceAll(' And ', ' and ').replaceAll(' Of ', ' of ');
    }

    public static Format(input : string)
    {
        // eslint-disable-next-line no-param-reassign -- pre-existing
        input = input.replaceAll('-',' ')
        // eslint-disable-next-line no-param-reassign -- pre-existing
        input = this.Capitalize(input);
        return input;
    }

    public static FormatPlain(input : string)
    {
        // eslint-disable-next-line no-param-reassign -- pre-existing
        input = input.replaceAll('-',' ')
        return input;
    }

    public static convertToTitleCase( str: string ) : string{
        if (!str) {
        return "";
        }
        return str.toLowerCase().replace(/\b\w/gu, (char) => char.toUpperCase());
    }

    public static FormatDate(input : string) : string
    {
        // This method expects 19 december 2020 as 20201219 (YYYMMDD)
        const dateString = input;
        const year = parseInt(dateString.substring(0,4));
        const month = parseInt(dateString.substring(4,6));
        const day = parseInt(dateString.substring(6,8));
        const date = new Date(year, month-1, day);
        const result = `${date.getDate()  } ${  date.toLocaleString('en-US', { month: 'short' })  }, ${  date.getFullYear()}`;
        return result
    }

    public static FormatDateAsDate(date : Date)
    {
        const result = `${date.getDate() 
         } ${
          date.toLocaleString('en-US', { month: 'short' }) 
          }, ${ 
          date.getFullYear()
          } ${
          date.getUTCHours()
          }:${
          date.getUTCMinutes()
          }:${
          date.getUTCSeconds()
          } UTC`
        return result
    }

    public static DisplayLink(input : string) : string
    {
        return input.trim().replaceAll('https','').replaceAll('http','').replaceAll('://','')
    }
}