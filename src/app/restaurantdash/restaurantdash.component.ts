import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms'
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurantdash',
  templateUrl: './restaurantdash.component.html',
  styleUrls: ['./restaurantdash.component.css']
})
export class RestaurantdashComponent implements OnInit {

  formValue: FormGroup;
  restaurantDataObject: RestaurantData = new RestaurantData;
  allRestaurantData: any;
  showAdd: boolean;
  showBtn: boolean;

  constructor(private formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData();
  }

  onAddResto() {
    this.formValue.reset();
    this.showAdd = true;
    this.showBtn = false;
  }
  addResto() {
    this.restaurantDataObject.name = this.formValue.value.name;
    this.restaurantDataObject.email = this.formValue.value.email;
    this.restaurantDataObject.mobile = this.formValue.value.mobile;
    this.restaurantDataObject.address = this.formValue.value.address;
    this.restaurantDataObject.services = this.formValue.value.services;
    this.api.postRestaurant(this.restaurantDataObject).subscribe(res => {
      console.log(res);
      alert("Restaurant added successfully");
      this.formValue.reset()
      this.getAllData();
    },
      err => {
        alert("something went wrong - do check ");
      })
  }

  getAllData() {
    this.api.getRestaurant().subscribe(res => {
      this.allRestaurantData = res;
    })
  }

  deleteResto(data: any) {
    this.api.deleteRestaurant(data.id).subscribe(res => {
      alert("data is been deleted ")
      this.getAllData();

    })
  }

  onEditResto(data: any) {
    this.showAdd = false;
    this.showBtn = true;
    this.restaurantDataObject.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  UpdateResto() {
    this.restaurantDataObject.name = this.formValue.value.name;
    this.restaurantDataObject.email = this.formValue.value.email;
    this.restaurantDataObject.address = this.formValue.value.address;
    this.restaurantDataObject.mobile = this.formValue.value.mobile;
    this.restaurantDataObject.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurantDataObject, this.restaurantDataObject.id).subscribe(res => {
      alert("restaurant updated");
      this.formValue.reset()
      this.getAllData();
    })
  }
}
