import { Component, OnInit } from '@angular/core';
import {
  faEnvelope,
  faLock,
  faUser,
  faPlusCircle,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faUser = faUser;
  faPlusCircle = faPlusCircle;

  avatarUrl: any = '../../../assets/img/user.png';

  selectedFile = null;

  constructor() {}

  ngOnInit(): void {}

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (event: any) => {
        this.avatarUrl = event.target.result;
      };
    }
  }

  onUpdate() {}
}
