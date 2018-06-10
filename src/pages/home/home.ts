import { Component } from '@angular/core';

import { NavController, Platform  } from 'ionic-angular';
import { Camera, NativeStorage } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public extraOptions : {};

  public base64Image: string[];
  constructor(public navCtrl: NavController, public platform: Platform) {
    this.base64Image = new Array();
     this.extraOptions = {
      pager: true,
      paginationClickable: true,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: 2000
    }
    this.platform.ready().then(() => {
      NativeStorage.getItem("photos").then(data => {
			this.base64Image = data.split(",");
      },
      error => {
        console.log("error in getting photos "+error);
      });
    });

}

takePicture() {
    Camera.getPicture({
            quality : 75,
            destinationType : 1,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            saveToPhotoAlbum: false
        }).then((imageUri) => {
          console.log("imageUri is "+imageUri);
          this.base64Image.push(imageUri);
          let imageUris = this.base64Image.map(o => o).join(', ');

          NativeStorage.setItem('photos', imageUris).then(
            () => console.log('Stored item!'),
            error => console.error('Error storing item', error)
          );
          console.log("imageUris is "+imageUris);

    }, (err) => {
        console.log("error occured "+err);
    });
  }

}
