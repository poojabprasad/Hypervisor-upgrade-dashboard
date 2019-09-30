import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appUpgradeStatus]'
})
export class UpgradeStatusDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.color = 'gold';
    //el.nativeElement.style.color = 'red';
  }

}
