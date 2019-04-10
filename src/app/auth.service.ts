import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private afAuth:AngularFireAuth ) { }

  //signup method for auth service 
  signUp(email:string, password:string){
    return new Promise( (resolve, reject) =>{
      this.afAuth.auth.createUserWithEmailAndPassword( email, password )
      .then( (response) =>{ resolve(response) })
      .catch( (error) => { reject(error) })
    });
  }

  //signin method for auth service
  signIn(email:string, password:string){
    return new Promise( (resolve, reject) =>{
      this.afAuth.auth.signInWithEmailAndPassword( email, password )
      .then( (response) =>{ resolve(response) })
      .catch( (error) => { reject(error) })
    });
  }

  //signout method
  signOut(){
    return new Promise(( resolve, reject)=>{
      this.afAuth.auth.signOut()
      .then( () => { resolve(true); }) //signout from firebase returns void, so we set the resolve to true
      .catch((error)=>{
        reject(error); //we reject with the error
      })
    })
  }
}
