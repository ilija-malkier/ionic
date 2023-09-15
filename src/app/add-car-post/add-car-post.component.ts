import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import 'firebase/storage';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {CarService} from "../services/car.service";
import {ICar} from "../models/icar";
import {AuthService} from "../services/auth.service";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-car-post',
  templateUrl: './add-car-post.component.html',
  styleUrls: ['./add-car-post.component.scss'],
})
export class AddCarPostComponent  implements OnInit {

  myForm: FormGroup;
  private filePath: string;
  private fileRef: any;
  private user
  isLoading:boolean=false
  private  fileToSave;

  //morao sam da kopiram storage path u env da bi radio storage
  constructor(private formBuilder: FormBuilder,private carService:CarService,private authService:AuthService) {
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', [Validators.required, Validators.min(0)]],
      date_published: [new Date().toISOString(), Validators.required],
      // file: ['', Validators.required],
    });
    authService.getUser().subscribe(data=>{
      this.user=data
    })
  }

  ngOnInit() {}

  onSubmit() {
    this.isLoading=true;
    if (this.myForm.valid) {
      // Handle form submission here, e.g., send data to a server
      console.log(this.myForm.value);
      let carPost=<ICar>this.myForm.value
      carPost.user_email=this.user.email
      carPost.id=uuidv4().toString()
      this.carService.createPost(carPost, this.fileToSave)

    } else {
      // Handle form validation errors
      console.log("Form is invalid");
    }
    this.isLoading=false;
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
    this.fileToSave=file
    // this.fileRef = this.storage.ref(this.filePath);

  }

}
