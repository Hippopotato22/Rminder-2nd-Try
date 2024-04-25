import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LocalNotificationsPlugin } from '@capacitor/local-notifications';
import { Capacitor } from '@capacitor/core';
import { AlarmServiceService } from 'src/app/services/alarm-service.service';



@Component({
  selector: 'app-note-alarm',
  templateUrl: './note-alarm.component.html',
  styleUrls: ['./note-alarm.component.scss'],
})
export class NoteAlarmComponent  implements OnInit {

  
  alarmTime: string;

  constructor( 
    private alertController: AlertController,


  
    
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {}

  setAlarm() {

    const alarmTime = new Date(this.alarmTime).getTime();
    const currentTime = new Date().getTime();

    if (alarmTime > currentTime) {
      
      const timeUntilAlarm = alarmTime - currentTime;

      setTimeout(() => {
        this.presentAlert();
      }, timeUntilAlarm);
    } else {
      // Handle invalid alarm time
      console.log('Invalid alarm time');
    }
    //this.router.navigateByUrl('');
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alarm',
      message: 'Your alarm is triggered!',
      buttons: ['OK']
    
    });

    await alert.present();
  }
}