import {Component, OnInit, ViewChild} from '@angular/core';
import {IonDatetime, IonInput, IonModal} from "@ionic/angular";
import {CustomerListCarCardComponent} from "../customer-list-car-card/customer-list-car-card.component";
import {max, min} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './customer.home.component.html',
  styleUrls: ['./customer.home.component.scss'],
})
export class CustomerHomeComponent implements OnInit {

  tab:number=1
  constructor() { }

  ngOnInit() {}
  @ViewChild(IonModal) modal: IonModal;
  @ViewChild(CustomerListCarCardComponent) customerList:CustomerListCarCardComponent
  dateTime:string=(new Date()).toISOString()
  minPrice:string="0"
  maxPrice:string="100000"
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string='';

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.customerList.filter(this.dateTime,this.minPrice,this.maxPrice)
    this.modal.dismiss(this.name, 'confirm');
  }


  search(event: any) {
    const query = event.target['value'].toLowerCase();
    this.customerList.search(query)
  }

  protected readonly max = max;

  tabChange(number: number) {

    this.tab=number
  }
}
