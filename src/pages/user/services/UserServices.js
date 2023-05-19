import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, } from 'firebase/firestore';
import { firestore } from "../../../firebase";

export class UserServices {

    collectionName = "user";
    userCollection = collection(firestore, this.collectionName)

    create(data) {
        return addDoc(this.userCollection ,data);
    }

    getAll(){ 
        return getDocs(this.userCollection);
    }

    update(data) {
        let _id = data.id
        delete data.id
        const docRef = doc(firestore, this.collectionName, _id);
        return  updateDoc(docRef,data )
    }

    delete(data) {
        let _id = data.id
        delete data.id
        const docRef = doc(firestore, this.collectionName, _id);
        return  deleteDoc(docRef,data )
    }

} 