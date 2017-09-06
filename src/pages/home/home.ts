import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import nipplejs from 'nipplejs'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  size :number = 50; 

  constructor(public navCtrl: NavController) {
    
  }

  ngAfterViewInit() {
    console.log(document.getElementById('zone_joystick'));

    var options = {
        zone: document.getElementById('zone_joystick'),
        size: 2 * this.size
    };

    var manager = nipplejs.create(options);

    manager.on('added', function (evt, nipple) {
      console.log('added');
      nipple.on('move', function (evt, data) {

        if(data.angle) {
          if(Math.abs(data.force) <= 1) {
            // px, py are between 0 and 1
            let px = +Math.sin(data.angle.radian) * data.force;
            let py = -Math.cos(data.angle.radian) * data.force;  
          
            console.log('px: ' + px);
            console.log('py: ' + py);
          }
        }

      });
      }).on('removed', function (evt, nipple) {
        console.log('removed');
        nipple.off('move');
    });
  }

}
