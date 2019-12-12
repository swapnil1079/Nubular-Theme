import { NgModule,ModuleWithProviders } from '@angular/core';
import {ShowErrorsComponent} from './show-errors/show-errors.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [ShowErrorsComponent],
    exports: [CommonModule,ShowErrorsComponent]
})
export class ErrorModule {
    // static forRoot(): ModuleWithProviders {
    //     return <ModuleWithProviders>{
    //       ngModule: SharedModule,
          
    //     };
    //   }

}



