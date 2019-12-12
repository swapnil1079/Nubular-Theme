import {EmailTypeModel} from '../models/EmailType.model'

export class EmailType {

    public static EmailTypeModel: EmailTypeModel[] = [
        {
          name: "DRAFT", value: 'DRAFT'
        },
        {
          name: "ACTIVE", value: 'ACTIVE'
        },
        {
          name: "INACTIVE", value: 'INACTIVE'
        },
        {
          name: "PAUSE", value: 'PAUSE'
        },
        ];
    
}
 // public static DevApiUrl = "https://api-uat.tm.org:443/";