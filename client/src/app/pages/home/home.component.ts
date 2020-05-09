import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { HtmlElService } from 'src/app/shared/services/htmlEl/html-el.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild(HeaderComponent, { read: ElementRef })
  private modal: ElementRef;

  constructor(private htmlElService: HtmlElService) {}

  ngOnInit(): void {}

  ngAfterViewInit() {}

  openSignModal() {
    $(this.htmlElService.modalElement).modal('show');
  }
}
