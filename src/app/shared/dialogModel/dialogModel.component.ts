import { Component,ViewChild  } from '@angular/core';
import {CommonServiceService} from '../../core/@services/common-service.service';
import { LoaderService } from '../../core/@services/loader.service';
import { dialogModelService } from '../../core/@services/dialogModelService';
declare var $:any;

@Component({
    selector: 'app-dialogModel',
    templateUrl: './dialogModel.component.html',
   
  })
  export class DialogModelComponent  {
   message:string = '';
   condition = '';
   page='';
   constructor(private loaderService: LoaderService,private dialogModelService: dialogModelService) {
    
    this.dialogModelService.componentMethodCalled$.subscribe(
        (model) => {
          this.popUpOpen(model.message,model.condition);            
        }
      );
    
    }

    
    
   
   popUpOpen(message,condition)
    {
        
       this.loaderService.show();
       this.message = message;
       this.condition = condition;
               
        var promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                setTimeout(() => {
                    this.loaderService.hide();
                        $("#myModal").modal("show");                       
                    }, 1000);              
                resolve();              
            }, 300);
          });
      //  console.log(promise);
          return promise;            
    }


  }