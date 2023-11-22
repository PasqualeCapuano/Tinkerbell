import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticketing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticketing.component.html',
  styleUrl: './ticketing.component.scss'
})
export class TicketingComponent {

  tableColumns = ['name', 'weight', 'symbol'];

  tableData = [
    { id: 1, first: 'Mark', last: 'Otto', handle: 'mdo' },
    { id: 2, first: 'Jacob', last: 'Thornton', handle: 'fat' },
    { id: 3, first: 'Larry the Bird', last: 'Panzer', handle: 'twitter' }
  ];


}
