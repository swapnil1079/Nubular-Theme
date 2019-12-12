import { NgModule,ModuleWithProviders } from '@angular/core';
import { DialogModelComponent } from './dialogModel/dialogModel.component';
import { MessageModelComponent } from './message-model/message-model.component';
import { LoaderComponent } from './Loader/loader.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import {Time} from './pipe/Dateformat.pipe';
import {Recurrence} from './pipe/Recurrence.pipe';


@NgModule({
    imports: [
        CommonModule,MatProgressSpinnerModule
    ],
    declarations: [DialogModelComponent,MessageModelComponent,LoaderComponent,Time,Recurrence],
    exports: [CommonModule,DialogModelComponent,MessageModelComponent,LoaderComponent,MatProgressSpinnerModule,Time,Recurrence]
})
export class SharedModule {
    // static forRoot(): ModuleWithProviders {
    //     return <ModuleWithProviders>{
    //       ngModule: SharedModule,
          
    //     };
    //   }

}



