import { Injectable } from '@angular/core';
import {ICar} from "../models/icar";
import {AngularFirestore, AngularFirestoreCollection, DocumentSnapshot} from "@angular/fire/compat/firestore";
import {IDBUser} from "../models/idb-user";
import {Router} from "@angular/router";
import {min, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carPostCollection:AngularFirestoreCollection<ICar>
  private searchQuery:string=''
  constructor(private firestore:AngularFirestore,private router:Router,private storage:AngularFireStorage,private auth:AuthService) {

    this.carPostCollection = firestore.collection("car-posts");
  }

  getCarPost(id:string){
     return this.carPostCollection.doc(id).get()
  }

  createPost(carPost: ICar, fileToSave:File) {

    console.log(this.auth.user.uid)

    this.storage.ref('/'+this.auth.user.uid).put(fileToSave.name).then(data=>{

        data.ref.getDownloadURL().then(data=>{
          this.carPostCollection.doc(carPost.id).set({...carPost,image_path:data}).then(data=>{
            this.router.navigate(['seller/home'])
          })
        })


    })
  }
  deletePost(id:string){
    this.carPostCollection.doc(id).delete()
  }

   async  getCarPostsByEmail(email) {
    return await this.carPostCollection.ref.where('user_email','==',email).get()
  }

  async updateCarPost(carPost: ICar, id: string) {
     await this.carPostCollection.doc(id).update(carPost).then(()=> this.router.navigate(['seller/home']))
  }

async  searchByQuery(query: string) {
    //contains
    this.searchQuery=query
    return await this.carPostCollection.ref.where('name', '>=', query).where('name', '<=', query + '\uf8ff').get()
  }

 async getCarPosts() {
    this.searchQuery=''
    return await this.carPostCollection.ref.get();
  }


 async filter(datetime: string, minValue: string, maxValue: string) {

    console.log(datetime)
    console.log(minValue)
    console.log(maxValue)
    let result:ICar[]=[]
   if(minValue!=null && maxValue!=null){
     var iqueryPrice = await this.queryPrices(minValue, maxValue);
     iqueryPrice.forEach(x=>{
       result.push(<ICar>x.data())

     })
   }
   console.log(result)
   if(datetime!=null){
     var iqueryDate = await this.queryDate(datetime);
     iqueryDate.forEach(x=>{
       if (result.filter(e => e.id !== (<ICar>x.data()).id).length > 0) {
         result.push(<ICar>x.data())
       }
     })
   }





    return result

  }

  private async queryPrices(minValue: string, maxValue: string) {
      return await this.carPostCollection.ref.where('price','>=',minValue).where('price','<=',maxValue).get()
  }
  async  queryDate(date:string){
    return      await  this.carPostCollection.ref.where('date_published','>=',date).get()
  }


}
