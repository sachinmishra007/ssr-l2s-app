import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommunicationService } from 'src/app/services/communication.service';
import { HeaderComponent } from '../header/header.component';
import { SocialShareComponent } from '../social-share/social-share.component';

@Component({
  selector: 'app-achieve-mfe',
  templateUrl: './achieve-mfe.component.html',
  styleUrls: ['./achieve-mfe.component.scss']
})
export class AchieveMfeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mainelem', { static: false }) mainelem: any;
  @ViewChild('toggle', { static: false }) toggle: any;
  @ViewChild('HeaderRender', { static: true, read: ViewContainerRef }) headerRender: ViewContainerRef;
  @ViewChild('socialShare', { static: true, read: ViewContainerRef }) socialShare: ViewContainerRef;
  manageSubscription$: Subscription = new Subscription();
  constructor(
    private _cdRef: ChangeDetectorRef,
    private _resolver: ComponentFactoryResolver,
    private _commSvc: CommunicationService
  ) {

  }

  ngOnDestroy() {
    this.manageSubscription$.unsubscribe();
  }

  async ngAfterViewInit() {

    await import(/* webpackChunkName: "02-header-navigation.module"*/'../header/header.module')
      .then((_comp) => {
        const factory = this._resolver.resolveComponentFactory(HeaderComponent);
        const _componentRef = this.headerRender.createComponent(factory);

      })
      .catch((_error) => {
        console.log(_error);
      })
    
    
      // loading the social share icons
    await import(/* webpackChunkName: "03-social-share-icons.module"*/ '../social-share/social-share.module')
      .then((_comp) => {
        const factory = this._resolver.resolveComponentFactory(SocialShareComponent);
        const _componentRef = this.socialShare.createComponent(factory);
        _componentRef.instance.shareConfig = {
          post_url: 'https://www.google.com/',
          post_title: 'Ways to achieve the microfrontend',
          hastags: 'microfrontend, frontend,angular,iframe,singlespa,webcomponents,reverseporxy',
          articleSummary: 'Ways to achieve the microfrontend',
        }
      })
      .catch((_error) => {
        console.log(_error);
      });

    this.manageSubscription$.add(
      this._commSvc._mainComm.subscribe((_response: any) => {
        if (_response.type == 'HeaderComm') {
          if (_response.value.toggle) {
            this.mainelem.nativeElement.classList.add('darkTheme');
          }
          else {
            this.mainelem.nativeElement.classList.remove('darkTheme');
          }
          this.setState();
        }
      })
    );


  }

  share(app: string) {
    const post_url: string = 'https://www.google.com/';
    const post_title: string = 'Ways to achieve the microfrontend';
    const hashtags: string = 'microfrontend, frontend,angular,iframe,singlespa,webcomponents,reverseporxy';
    const articleSummary: string = 'Ways to achieve the microfrontend';
    let url: string = '';
    switch (app) {
      case 'linkedin':
        {
          url = `https://www.linkedin.com/sharing/share-offsite/?url=${post_url}&title=${post_title}&summary=${articleSummary}`;
          break;
        }
      case 'twitter':
        {
          url = `https://twitter.com/share?url=${post_url}&text=${post_title}&hashtags=${hashtags}`;
          break;
        }
      case 'facebook':
        {
          url = `https://www.facebook.com/sharer.php?u=${post_url}`;
          break;
        }
      case 'pinterest':
        {
          url = `https://pinterest.com/pin/create/bookmarklet/?url=${post_url}&description=${post_title}`;
          break;
        }
      case 'whatsapp':
        {
          url = `https://api.whatsapp.com/send?text=${post_title} ${post_url}`;
          break;
        }
      default:
        break;
    }
    window.open(url, '_blank');
  }

  public setState() {
    this._cdRef.markForCheck();
  }

}
