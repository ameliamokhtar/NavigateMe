import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { IonicPage, NavController, NavParams, Nav } from 'ionic-angular';
import { LoginPage } from '../login/login';

export interface PageInterface {
  title: string;
  pageName: string;
  tabComponent?: any;
  index?: number;
  icon: string;
}

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  rootPage = 'TabsPage';

  @ViewChild(Nav) nav: Nav;
 
  pages: PageInterface[] = [
    { title: 'Home', pageName: 'TabsPage', tabComponent: 'Tab1Page', index: 0, icon: 'ios-home' },
    { title: 'My profile', pageName: 'TabsPage', tabComponent: 'Tab2Page', index: 1, icon: 'ios-person' },
    { title: 'Notification', pageName: 'TabsPage', tabComponent: 'Tab3Page', index: 2, icon: 'ios-notifications' },
    { title: 'Search', pageName: 'TabsPage', tabComponent: 'Tab4Page', index: 3, icon: 'ios-search' },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  logout(){
    this.navCtrl.push(LoginPage);
}

  openPage(page: PageInterface) {
    let params = {};
 
    // The index is equal to the order of our tabs inside tabs.ts
    if (page.index) {
      params = { tabIndex: page.index };
    }
 
    // The active child nav is our Tabs Navigation
    if (this.nav.getActiveChildNav() && page.index != undefined) {
      this.nav.getActiveChildNav().select(page.index);
    } else {
      // Tabs are not active, so reset the root page 
      // In this case: moving to or from SpecialPage
      this.nav.setRoot(page.pageName, params);
    }
  }

  isActive(page: PageInterface) {
    // Again the Tabs Navigation
    let childNav = this.nav.getActiveChildNav();
 
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().root === page.tabComponent) {
        return 'primary';
      }
      return;
    }
 
    // Fallback needed when there is no active childnav (tabs not active)
    if (this.nav.getActive() && this.nav.getActive().name === page.pageName) {
      return 'primary';
    }
    return;
  }

}

