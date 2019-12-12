import { AppSettings } from './appsetting';
export class ErrorModelSetting {
    
    /* error status and their text */
    public static noserver = {
        message: AppSettings.noserver,
        condition: 'error'
    };
    public static noresponse = {
        message: AppSettings.noresponse,
        condition: 'error'
    };
    public static badrequest = {
        message: AppSettings.badrequest,
        condition: 'error'
    };
    public static unauthorized = {
        message: AppSettings.unauthorized,
        condition: 'error'
    };
    public static forbidden = {
        message: AppSettings.forbidden,
        condition: 'error'
    };
    public static notfound = {
        message: AppSettings.notfound,
        condition: 'error'
    };
    public static internalerror = {
        message: AppSettings.internalerror,
        condition: 'error'
    };
  
  
  
  
  }