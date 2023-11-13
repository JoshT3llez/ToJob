import { Injectable,inject } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { User } from '../models/user.model';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {getFirestore, setDoc, doc} from '@angular/fire/firestore';
import { getDoc } from 'firebase/firestore';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private userName: string;

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  utilsSvc = inject(UtilsService);

  setUserName(name: string): void {
    this.userName = name;
  }

  getUserName(): string {
    return this.userName;
  }

    getAuth(){
      return getAuth();
    }




  //auth
  singIn(user: User){
    return signInWithEmailAndPassword(getAuth(),user.email,user.password);
  }
//crear usuario
  singUp(user: User){
    return createUserWithEmailAndPassword(getAuth(),user.email,user.password);
  }


  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser,{displayName});

  }

  singOut(){
    return getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.router.navigate(['/login']);
  }




  //----------database------------
  setDocument(path:string, data:any){
    return setDoc(doc(getFirestore(),path),data);
  }


  async getDocument(path:string){
    return (await getDoc(doc(getFirestore(),path))).data();
  }
}
