import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, HostListener, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AchieveMfeComponent } from './components/achieve-mfe/achieve-mfe.component';
import { CommunicationService } from './services/communication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild('mainContent') private templateViewContainerRef?: TemplateRef<any>;
  @ViewChild('mainContent', { static: true, read: ViewContainerRef }) entry: ViewContainerRef;
  manageSubscription$: Subscription = new Subscription();
  constructor(
    private _commSvc: CommunicationService,
    private _cdRef: ChangeDetectorRef,
    private _activateRoute: ActivatedRoute,
    private _resolver: ComponentFactoryResolver
  ) {

  }

  ngOnInit() {
    this._commSvc.cdEvent.headerState = this.setState.bind(this);
  }

  ngAfterViewInit() {
    // // console.log(this.templateViewContainerRef)
    import(/* webpackChunkName: "01-achieve.mfe.module"*/ '../app/components/achieve-mfe/achieve.mfe.module')
      .then((_comp) => {
        const factory = this._resolver.resolveComponentFactory(AchieveMfeComponent);
        const componentRef = this.entry.createComponent(factory);
        this.setState();

      })
      .catch((_error) => {
        console.log(_error);
      });
    // this.manageSubscription$.add(
    //   this._activateRoute.params.subscribe((_routeConfig) => {
    //     console.log(_routeConfig);
    //   })
    // );
  }

  ngOnDestroy(): void {
    this.manageSubscription$.unsubscribe();
  }

  public setState() {
    this._cdRef.detectChanges();
  }

}
