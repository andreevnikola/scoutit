import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-profile-modal',
  templateUrl: './profile-modal.component.html',
  styleUrls: ['./profile-modal.component.css'],
})
export class ProfileModalComponent {
  constructor() {}
  /*
  open(content: any) {
    this.modalService.open(content);
  }

        @ViewChild("content",{static:true}) content:ElementRef;
        ngOnInit(): void {
            this.modalService.open(this.content);
        }*/
}
