import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router} from "@angular/router";
import {DataService} from "../../../services/data.service";

@Component({
  selector: 'app-ticketing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticketing.component.html',
  styleUrl: './ticketing.component.scss'
})
export class TicketingComponent {

  constructor(private router: Router, private dataService: DataService) {}

  tableColumns = ['name', 'weight', 'symbol'];

  tableData = [
    { id: 1,
      customerName: 'Mark',
      customerEmail: 'mark@gmail.com',
      title: 'New Ticket 3',
      description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      status: 'open',
    },
    { id: 2,
      customerName: 'Paul',
      customerEmail: 'paul@gmail.com',
      title: 'New ticket 2',
      description: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
      status: 'closed',
    },
    { id: 3,
      customerName: 'Claire',
      customerEmail: 'claire@gmail.com',
      title: 'New ticket 3',
      description: 'ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
      status: 'processing',
    }
  ];


  openDetailPage(data: any) {
    this.dataService.setCurrentRowData(data);
    this.router.navigate(['/home/ticketing/' + data.id]);
  }

}
