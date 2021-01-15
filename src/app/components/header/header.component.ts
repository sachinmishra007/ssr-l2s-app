import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommunicationService } from 'src/app/services/communication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit, AfterViewInit {
  _toggleBtn: boolean = true;
  @ViewChild('toggle', { static: false }) toggle: any;

  constructor(
    private _cdRef: ChangeDetectorRef,
    private _commSvc: CommunicationService
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    const darkTheme: string = localStorage.getItem('toggle') || '';
    if (darkTheme != '') {
      this._toggleBtn = JSON.parse(darkTheme);
      if (this._toggleBtn) {
        // this.mainelem.nativeElement.classList.add('darkTheme');
        this.toggle.nativeElement.getElementsByClassName('toggle-thumb')[0].style.left = '27px';

      }
      else {
        // this.mainelem.nativeElement.classList.remove('darkTheme');
        this.toggle.nativeElement.getElementsByClassName('toggle-thumb')[0].style.left = '1px';
      }
      this._toggleBtn = !this._toggleBtn;
    }
    setTimeout(() => {
      this.sendInfo();
    }, 100);
  }

  toggleOption(element: any) {
    if (this._toggleBtn) {
      element.getElementsByClassName('toggle-thumb')[0].style.left = '27px';
      // this.mainelem.nativeElement.classList.add('darkTheme');
    }
    else {
      element.getElementsByClassName('toggle-thumb')[0].style.left = "1px";
      // this.mainelem.nativeElement.classList.remove('darkTheme');
    }
    this._toggleBtn = !this._toggleBtn;
    localStorage.setItem('toggle', JSON.stringify(!this._toggleBtn));
    this.sendInfo();

  }

  private sendInfo() {
    this._commSvc._mainComm.next({
      type: 'HeaderComm',
      value: {
        toggle: this._toggleBtn
      }
    });

  }

  public setState() {
    this._cdRef.markForCheck();
  }

}
