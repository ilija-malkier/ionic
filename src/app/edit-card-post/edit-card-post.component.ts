import {Component, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ICar} from "../models/icar";
import {Router} from "@angular/router";
import {CarService} from "../services/car.service";

@Component({
  selector: 'app-edit-card-post',
  templateUrl: './edit-card-post.component.html',
  styleUrls: ['./edit-card-post.component.scss'],
})
export class EditCardPostComponent  implements OnInit {

  myForm: FormGroup;
  private filePath: string;
  private fileRef: any;

  carPost:ICar=null

  //morao sam da kopiram storage path u env da bi radio storage
   constructor(private formBuilder: FormBuilder,private router:Router,private carService:CarService) {
      this.carPost =  <ICar>this.router.getCurrentNavigation().extras.state['data']
    console.log(this.carPost)
    this.myForm = this.formBuilder.group({
      name: [this.carPost?.name, Validators.required],
      price: [this.carPost?.price, [Validators.required, Validators.min(0)]],
      description: [this.carPost?.description, [Validators.required, Validators.min(0)]],
      date_published: [this.carPost?.date_published, Validators.required],
      // file: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.myForm.valid) {
      // Handle form submission here, e.g., send data to a server
      this.carService.updateCarPost(<ICar>this.myForm.value,this.carPost.id)
    } else {
      // Handle form validation errors
      console.log("Form is invalid");
    }
  }

  uploadFile(){
    // const task = this.storage.upload(this.filePath, this.fileRef);
    //
    // // Monitor the upload progress
    // task.percentageChanges().subscribe((percentage) => {
    //   console.log(`Uploading: ${percentage}%`);
    // });
    //
    // // Get notified when the upload is complete
    // task.snapshotChanges().subscribe((snapshot) => {
    //   if (snapshot.state === 'success') {
    //     console.log('Upload complete!');
    //   }
    // });
  }

  setFile(event: any) {
    const file = event.target.files[0];
    this.filePath = `uploads/${file.name}`;
    console.log(this.filePath)
    // this.fileRef = this.storage.ref(this.filePath);

  }
}
