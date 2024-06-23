import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  template: ``,
})
export class BasicFormComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input() loading!: boolean;
  @Output() submitEvent: EventEmitter<typeof this.form.value> =
    new EventEmitter();

  submitForm() {
    this.submitEvent.emit(this.form.value);
  }
}
