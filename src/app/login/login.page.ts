
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from 'firebase/app'
import AuthProvider = firebase.auth.AuthProvider;
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/Authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = ""
  password: string = ""
  constructor(private authService: AuthenticationService, public auth: AngularFireAuth, public alertController: AlertController, public router: Router) {
  }

  ngOnInit() {
  }


  async presentAlert(title: string, content: string) {
    const alert = await this.alertController.create({
      header: title,
      message: content,
      buttons: ['OK']
    })

    await alert.present()
  }

  register() {
    this.router.navigate(['/register'])
  }

  async login() {
    const { username, password } = this
    try {

      const res = await this.auth.signInWithEmailAndPassword(username, password)
      this.authService.login()
      // Schedule a single notification

      this.router.navigate(['/tabs'])

      // kind of a hack. 
      // this.auth.signInWithEmailAndPassword(username + '@codedamn.com', password)

    } catch (err) {
      console.dir(err)
      if (err.code === "auth/user-not-found") {
        this.presentAlert('Error', 'Usuario no encontrado')
        console.log("User not found")
      }
      if (err.code === "auth/wrong-password") {
        this.presentAlert('Error', 'Contraseña incorrecta')
        console.log("User not found")
      }


    }
  }


}
