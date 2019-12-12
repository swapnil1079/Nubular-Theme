export interface NavItem {
  label: string;
    disabled?: boolean;
    imageIcon?: string;
    icon?:string;
    link?: string;
    externalRedirect?:boolean;
    faIcon?:string;
    hidden?:boolean;
    items?: NavItem[];
  }