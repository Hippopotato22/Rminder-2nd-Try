import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
//import { LocalNotificationsPlugin } from '@capacitor/local-notifications';
//import { Capacitor } from '@capacitor/core';
import { Media, MediaObject } from '@awesome-cordova-plugins/media/ngx';

import { Platform } from '@ionic/angular';
import { NoteDetailsComponent } from '../note-details/note-details.component';

import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-alarm',
  templateUrl: './note-alarm.component.html',
  styleUrls: ['./note-alarm.component.scss'],
  providers: [Media]
})
export class NoteAlarmComponent  implements OnInit {

  
  alarmTime: string;
  //audio: any;
  mediaFile: MediaObject;
  audio: HTMLAudioElement;
  noteId: any;
  

  constructor( 
    private alertController: AlertController,
    private notesService: NotesService, // Inject your NoteService

    private media: Media,
    private platform: Platform,
    
    private router: Router, 
    private route: ActivatedRoute,
    
  ) { 
    this.audio = new Audio('assets/alarm.mp3')
  }

  ngOnInit() {
   // this.noteId = this.notesService.getALL();
  }

  async setAlarm() {

    const alarmTime = new Date(this.alarmTime).getTime();
    const currentTime = new Date().getTime();

    if (alarmTime > currentTime) {
      
      const timeUntilAlarm = alarmTime - currentTime;

      setTimeout(() => {
        
        
        this.presentAlert();
        this.playAlarmSound();

        console.log('valid');
      
       // this.router.navigate(['/:id', this.noteId]);
      }, timeUntilAlarm);
    } else {
      // Handle invalid alarm time
      console.log('Invalid alarm time');
      //this.absentAlert();
      
    }
    //this.router.navigateByUrl('');  
    
  }

  TplayAlarmSound() {
    // Adjust file path based on the platform (iOS/Android)
    const filePath = this.platform.is('android')
      ? 'documents://assets/sounds/alarm.mp3'
      : 'file:src\assets\alarm.mp3'
  
    // Create the MediaObject to play the sound
    this.mediaFile = this.media.create(filePath);
  
    // Play the sound
    this.mediaFile.play();
    
  
     // Optionally, stop the sound after a duration (e.g., 10 seconds)
     setTimeout(() => {
      this.mediaFile.stop();
    }, 10000);  // Stops after 10 seconds
  
  }
  



  tstopAlarmSound() {
    if (this.mediaFile) {
      this.mediaFile.stop(); // Stop the sound
      this.mediaFile.release(); // Release resources
      console.log('Alarm sound stopped');
    }
  }

  trstopAlarmSound() {
    if (this.audio) {
      this.audio.pause(); // Stop the sound
      this.audio.currentTime = 0; // Reset the audio to the beginning
      console.log('sound stopped');
    }
  }



  stopAlarmSound() {
    if (this.platform.is('cordova')) {
      if (this.mediaFile) {
        this.mediaFile.stop();  // Stop the media file
        this.mediaFile.release(); // Release the resources
      }
    } else {
      if (this.audio) {
        this.audio.pause();  // Pause the HTML5 audio
        this.audio.currentTime = 0; // Reset to the start
      }
    }
  }

  activateAlarm() {
    this.playAlarmSound();  // Play the alarm sound
    this.presentAlert();    // Show the alert
  }



 


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alarm',
      message: 'Your alarm is triggered!',
      buttons: [{
        text: 'OK',
        handler: () => {
          
          this.stopAlarmSound(); // Call method to stop the alarm sound
          console.log('Alarm acknowledged');
        }
      }]
  
    });

    await alert.present();
  }

// async absentAlert () {
    //const alert = await this.alertController.create({
      //header: 'No Alarm Set',
      //message: 'Please select a date and time for the alarm.',
     // buttons: ['OK']
   // });
 // }



playAlarmSound() {
  if (this.platform.is('cordova')) {
    // Use cordova-plugin-media for native devices
    const filePath = this.platform.is('android')
      ? 'documents://assets/sounds/alarm.mp3'
      : 'file:///android_asset/www/assets/sounds/alarm.mp3';

    this.mediaFile = this.media.create(filePath);
    this.mediaFile.play();
 
  } else {
    // Use HTML5 Audio for browser testing
   // const audio = new Audio('assets/Butterfly.mp3');
    //audio.play();
    this.audio = new Audio('assets/Butterfly.mp3');
    this.audio.play();
    
  }

  
}

}