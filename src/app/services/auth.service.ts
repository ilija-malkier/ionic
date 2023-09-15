import {Injectable, OnInit} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";

import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {delay, map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {ILoginUser} from "../models/ILoginUser";
import {IDBUser} from "../models/idb-user";
import {IRegisterUser} from "../models/iregister-user";
import firebase from "firebase/compat";
import Firestore = firebase.firestore.Firestore;
import AuthCredential = firebase.auth.AuthCredential;
import PhoneAuthCredential = firebase.auth.PhoneAuthCredential;
import OAuthCredential = firebase.auth.OAuthCredential;
import EmailAuthProvider = firebase.auth.EmailAuthProvider;
import PhoneAuthProvider = firebase.auth.PhoneAuthProvider;
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class AuthService implements  OnInit{
  private redirect=false;
  private userCollection:AngularFirestoreCollection<IDBUser>
   user;

  constructor(private router:Router,private auth:AngularFireAuth,private firestore:AngularFirestore) {
    this.userCollection = firestore.collection("users");

    this.auth.authState.subscribe(async (user) => {
        if (user) {
          this.user = user
          localStorage.setItem('user', JSON.stringify(this.user));
          JSON.parse(localStorage.getItem('user')!);
          this.userCollection.doc(user.uid).get()
          const userRef = this.userCollection.doc(user.uid);
          const userDoc = await userRef.get().toPromise();
          if (userDoc.exists) {
            const userData = userDoc.data();
            const userRole = userData.role;
            if (userRole === 'seller') {
              this.router.navigate(['seller']);
            } else if (userRole === 'customer') {
              this.router.navigate(['customer']); // Navigate to user page
            }
          }

        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      },
      error => {
        console.log(error)
      },
      () => {
        console.log("finished")
      });

  }

  public  getUser() {
    return    this.auth.user;
  }
  public  loginUser(iuser:ILoginUser){

     return  this.auth.signInWithEmailAndPassword(iuser.email,iuser.password)
  }

  setUserData(user: firebase.User, role: string) {
    this.user={"user":user,"role":role}
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    //   `users/${user.uid}`
    // );
    // const userData: User = {
    //   uid: user.uid,
    //   email: user.email,
    //   displayName: user.displayName,
    //   photoURL: user.photoURL,
    //   emailVerified: user.emailVerified,
    // };
    // return userRef.set(userData, {
    //   merge: true,
    // });
  }
   ngOnInit() {

  }

  public  registerUser(registerUser:IRegisterUser){
     return  this.auth.createUserWithEmailAndPassword(registerUser.email,registerUser.password);
  }
  public saveUserToCollection(dbUser:IDBUser){
    this.userCollection.doc(dbUser.id).set(dbUser)
  }


  async logout() {
    await this.auth.signOut();
    if(this.redirect){
      this.router.navigateByUrl("/login")

    }
  }
}
