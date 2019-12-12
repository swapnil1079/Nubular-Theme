export class AppSettings {
  // api base url
  public static apikey = '66418695b588957';
  // public static appuser: string;
  // public static pagetitle = "Home"; https://jsonplaceholder.typicode.com/todos/
  public static ApiUrl = "http://localhost:4000/users/";
  public static DevApiUrl = "http://localhost:59731/api/User/"
  
  public static loginApiUrl = AppSettings.DevApiUrl+"Login";
  public static RegisterApiUrl = AppSettings.ApiUrl+"registeruser";

  /* Notification Url Starts*/
  /* email template api url */
  public static notification = "notification/"
  public static EmailTemplateListApiUrl = AppSettings.DevApiUrl
  public static EmailTemplateCreateApiUrl = AppSettings.DevApiUrl+"register";
  public static EmailTemplateUDRApiUrl = AppSettings.DevApiUrl;
   public static UserListApiUrl = AppSettings.ApiUrl+"users";
  public static UserAddApiUrl = AppSettings.ApiUrl+"users";

  /* sms template api url */
public static SmsTemplateListApiUrl = AppSettings.DevApiUrl+AppSettings.notification+"template/sms";
  public static SmsTemplateCreateApiUrl = AppSettings.DevApiUrl+AppSettings.notification+"template/sms";
  public static SmsTemplateUDRApiUrl = AppSettings.DevApiUrl+AppSettings.notification+"template/sms/";

  /* email work-flow group template api url */
public static EmailWorkFlowGroupListApiUrl = AppSettings.DevApiUrl+AppSettings.notification+"email/workflow";
  public static EmailWorkFlowGroupCreateApiUrl = AppSettings.DevApiUrl+AppSettings.notification+"email/workflow";
  public static EmailWorkFlowGroupUDRApiUrl = AppSettings.DevApiUrl+AppSettings.notification+"email/workflow/";

  

  /* lookup api */
  public static lookupapi = AppSettings.DevApiUrl+"lookup";
 

  /* Notification Url  Ends*/

  /* error status and their text */
  public static noserver = 'Server is not connected';
  public static noresponse = 'No response from server';
  public static badrequest = 'This is a bad request';
  public static unauthorized = 'Server says unauthorized';
  public static forbidden = 'This request is forbidden';
  public static notfound = 'Server says not found';
  public static internalerror = 'Server encountered internal error';
  public static ServerTimeouterror = 'Connection Timed Out';




}