import { Component, OnInit } from '@angular/core';
import { VisitorService } from '../../services/visitor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Order } from '../../../payload/order';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.css'
})
export class TrackingComponent implements OnInit{

  searchOrderForm!: FormGroup;
  order!: Order;

  constructor(private visitorService : VisitorService, private fb : FormBuilder){}

  ngOnInit(): void {
    this.searchOrderForm = this.fb.group({
      trackingId: ['', [Validators.required]]
    })
  }

  submitForm() {
    const trackingIdControl = this.searchOrderForm.get('trackingId');
    if (trackingIdControl && trackingIdControl.value) {
        const trackingId = trackingIdControl.value;
        this.visitorService.getOrderByTrackingId(trackingId).subscribe(res => {
            console.log(res);
            this.order = res;
        });
    }
  }
}
