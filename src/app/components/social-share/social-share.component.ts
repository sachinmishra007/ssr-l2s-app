import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-social-share',
  templateUrl: './social-share.component.html',
  styleUrls: ['./social-share.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // encapsulation: ViewEncapsulation.Emulated
})
export class SocialShareComponent implements OnInit, AfterViewInit {
  @Input() shareConfig: any = {
    post_url: '',
    post_title: '',
    hastags: '',
    articleSummary: ''
  };
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

  }


  shareApplication(app: string) {
    const post_url: string = this.shareConfig.post_url;//  'https://www.google.com/';
    const post_title: string = this.shareConfig.post_title;// 'Ways to achieve the microfrontend';
    const hashtags: string = this.shareConfig.hastags;//'microfrontend, frontend,angular,iframe,singlespa,webcomponents,reverseporxy';
    const articleSummary: string = this.shareConfig.articleSummary;// 'Ways to achieve the microfrontend';
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
}
