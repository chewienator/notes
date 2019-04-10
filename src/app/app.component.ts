import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth'; //we import it so we can check user status
//import router to redirect them to correct page
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public user:any; //user object to use personalised info
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },
    {
      title: 'Signup',
      url: '/signup',
      icon: 'person-add'
    },
    {
      title: 'Signin',
      url: '/signout',
      icon: 'exit'
    },
    {
      title: 'Signout',
      url: '/signin',
      icon: 'log-in'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private afAuth:AngularFireAuth,
    private router:Router
  ) {
    this.initializeApp();
    this.checkAuthStatus();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  //checks firebase user authentication status
  checkAuthStatus(){
    //we subscribe to the observable to have the status update
    this.afAuth.authState.subscribe( (user) => {
      if(user){
        this.user = user; //set user info to the user attribute
        this.router.navigate(['/home']); //redirect to home page
        //we update informaton for logged in user
        this.appPages = [
          {
            title: 'Home',
            url: '/home',
            icon: 'home'
          },
          {
            title: 'List',
            url: '/list',
            icon: 'list'
          },
          {
            title: 'Signout',
            url: '/signout',
            icon: 'log-in'
          }
        ];
      }else{
        //update navigation for logged out user
        this.user = null;
        this.router.navigate(['/signup']); //redirect to home page
        this.appPages = [
          {
            title: 'Signup',
            url: '/signup',
            icon: 'person-add'
          },
          {
            title: 'Signin',
            url: '/signin',
            icon: 'exit'
          }
        ];
      }
    })
  }
}
