import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { Nullable, strHelp } from '@app/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input()
  heading: Nullable<string>;

  @Input()
  targetKeys: string[] = ['escape'];

  @Output()
  targetKeyPress = new EventEmitter<string>();

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = (event.code ?? event.key);

    if (this.targetKeys.find(k => strHelp.stringEquals(k, key, true))) {
      this.targetKeyPress.emit(key);
    }
  }
}
