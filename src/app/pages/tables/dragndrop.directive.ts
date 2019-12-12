import { Directive, HostListener, EventEmitter, Output, Input } from '@angular/core';

@Directive({
  selector: '[appDragndrop]'
})
export class DragndropDirective {
  ///private filesChangeEmiter : EventEmitter<File> = new EventEmitter();
  @Output() private filesChangeEmiter : EventEmitter<File> = new EventEmitter();
  @Output() private filesInvalidEmiter : EventEmitter<File> = new EventEmitter();
  @Input() private allowedExtensions : Array<string> = [];


  @HostListener('dragover', ['$event']) onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
    let files = evt.dataTransfer.files;
    if(files.length > 0){
    
    }
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    
  }

  @HostListener('drop', ['$event']) public onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    //this.background = '#eee';
    let file = evt.dataTransfer.files;
    console.log(file.length);
    let valid_files : File = null;
    let invalid_files : File = null;
    if(file.length == 1){
      valid_files =file;
        // let ext = file.name.split('.')[file.name.split('.').length - 1];
        // if(this.allowedExtensions.lastIndexOf(ext) != -1){
        //   valid_files = file;
        // }else{
        //   invalid_files = file;
        // }
      
      this.filesChangeEmiter.emit(valid_files);
      this.filesInvalidEmiter.emit(invalid_files);
    }
    else
    {
      if(file.length > 1)
      {
        this.filesChangeEmiter.emit(file.length);
      }
      else
      {
        this.filesChangeEmiter.emit(valid_files);
      }
      
    }
  }

  constructor() { }

}
