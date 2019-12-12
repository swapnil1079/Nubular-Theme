import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from '../../core/@services/loader.service';
import { LoaderState } from './loader';

@Component({
    selector: 'angular-loader',
    encapsulation : ViewEncapsulation.None,
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.css']
})
export class LoaderComponent implements OnInit {

    show = false;

    private subscription: Subscription;

    constructor(
        private loaderService: LoaderService
    ) { }

    ngOnInit() { 
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}