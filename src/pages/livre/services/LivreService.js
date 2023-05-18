
import { collection, doc, getDoc, getDocs, setDoc, } from 'firebase/firestore';
import { firestore } from "../../../firebase";

export class LivreService {


    create(data) {
        // const docRef =   doc(firestore,`users/${ userCredential.user.uid}`);
        // return setDoc(docRef,data);
        return 0

    }


    getAll(){
      
        return getDocs(collection(firestore, "livre"));

    }


 

} 