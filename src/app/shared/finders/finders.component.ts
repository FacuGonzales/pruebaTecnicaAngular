import { Component, EventEmitter, Output } from '@angular/core';
import { InputStatusFilterComponent } from '../input-status-filter/input-status-filter.component';
import { InputNameFilterComponent } from '../input-name-filter/input-name-filter.component';

@Component({
  selector: 'app-finders',
  standalone: true,
  imports: [InputStatusFilterComponent, InputNameFilterComponent],
  templateUrl: './finders.component.html',
  styleUrl: './finders.component.scss'
})
export class FindersComponent {
  @Output() sendFilterName: EventEmitter<any> = new EventEmitter();
  @Output() sendFilterStatus: EventEmitter<any> = new EventEmitter();
}
