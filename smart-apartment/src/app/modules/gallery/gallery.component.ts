import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  @Input() galleryItem: any;

  showFlag: boolean = false;
  currentIndex: number = -1;
  imageObject: Array<object> = [];

  constructor() {}

  ngOnInit(): void {
    this.imageObject = this.galleryItem.map((item: string) => {
      return { image: item };
    });
  }

  showLightbox(index: any) {
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }
}
