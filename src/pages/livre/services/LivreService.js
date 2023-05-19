
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc, } from 'firebase/firestore';
import { firestore } from "../../../firebase";

export class LivreService {

 collectionName = "livre";
livreCollection = collection(firestore, this.collectionName)

    create(data) {
      
    
        return addDoc(this.livreCollection ,data);
  

    }


    getAll(){
      
        return getDocs(this.livreCollection);

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