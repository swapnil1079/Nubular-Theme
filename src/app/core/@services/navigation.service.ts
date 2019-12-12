import { Injectable } from '@angular/core';
import {NavItem} from '../models/nav.model'
@Injectable({
    providedIn: 'root'
  })

  export class NavigationService {

    appitems = [
        {
            label: 'NPM',
            imageIcon: '/assets/batman.jpg',
            link: 'https://www.npmjs.com/package/ng-material-multilevel-menu',
            externalRedirect: true
        },
        // {
        //     label: 'Dashboard',
        //     faIcon: 'fab fa-500px',
        //     items: [
        //         {
        //             label: 'Item 1.1',
        //             link: 'admin/tables1',
        //             faIcon: 'fab fa-accusoft'
        //         },
        //         {
        //             label: 'Item 1.2',
        //             faIcon: 'fab fa-accessible-icon',
        //             items: [
        //                 {
        //                     label: 'Item 1.2.1',
        //                     link: '/admin/tabless',
        //                     faIcon: 'fas fa-allergies'
        //                 },
        //                 {
        //                     label: 'Item 1.2.2',
        //                     faIcon: 'fas fa-ambulance',
        //                     items: [
        //                         {
        //                             label: 'Item 1.2.2.1',
        //                             faIcon: 'fas fa-anchor',
        //                             onSelected: function() {
        //                                 console.log('Item 1.2.2.1');
        //                             }
        //                         }
        //                     ]
        //                 }
        //             ]
        //         }
        //     ]
        // },
        {
            label: 'Dashboard',
            icon: 'alarm',
            items: [
            {
                label: 'Item 2.1',
                link: '/admin/tables',
                icon: 'favorite'
            },
            // {
            //     label: 'Item 2.2',
            //     link: '/item-2-2',
            //     icon: 'favorite_border'
            // }
            ]
        },
        {
            label: 'Home',
            icon: 'offline_pin',
            link: '/admin/home',
        },
        // {
        //     label: 'Item 4',
        //     link: '/item-4',
        //     icon: 'star_rate',
        //     hidden: false
        // }
    ];
  constructor() { }
  public getMenus(): any
  {
  return this.appitems;
  }

//   public getMenuByRoute(link: string): NavItem {
//     link = link.toLowerCase();
//     return this.navItems.find(i => i.link.toLowerCase() == link);
//   }
}