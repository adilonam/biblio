
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, } from 'firebase/firestore';
import { firestore } from "../../../firebase";
import { LivreService } from '../../livre/services/LivreService';
import { UserServices } from '../../user/services/UserServices';

export class EmpruntService {

    collectionName = "emprunt";
    empruntCollection = collection(firestore, this.collectionName)

    create(data) {
        return addDoc(this.empruntCollection, data);
    }

    getAll() {
        return getDocs(this.empruntCollection);
    }


    getJoinedData() {
        const livreService = new LivreService()
        const userService =  new UserServices()
        
        const empruntPromise = this.getAll().then((snapshot) => snapshot.docs.map((doc) =>{return {...doc.data(), "idemprunt" : doc.id} }));
        const livrePromise = livreService.getAll().then((snapshot) => snapshot.docs.map((doc) =>{return {...doc.data(), "idlivre" : doc.id} }));
        const userPromise = userService.getAll().then((snapshot) => snapshot.docs.map((doc) =>{return {...doc.data(), "iduser" : doc.id} }))



        //join 
     return   Promise.all([empruntPromise, livrePromise, userPromise])
            .then(([empruntData, livreData, userData]) => {
                // Join collections based on a common field (e.g., 'id')
                    const joinedData = empruntData.map((emprunt) => {
                    emprunt['date'] = emprunt['date'].toDate()

                    const matchingLivre = livreData.find((livre) => livre.idlivre === emprunt.idlivre);
                    const matchingUser = userData.find((user) => user.iduser === emprunt.iduser);
                    return { ...emprunt, ...matchingLivre ,... matchingUser};
                });

                return joinedData;


            })

        }




    update(data) {
        let _id = data.idemprunt
        let keep = ["iduser", "idlivre", "date"]
        let _data = {}
        keep.forEach(element => {
            _data[element]  = data[element]
        });
       
      
        const docRef = doc(firestore, this.collectionName, _id);
        return updateDoc(docRef, _data)
    }

    delete(data) {
        let _id = data.idemprunt
        delete data.idemprunt
        const docRef = doc(firestore, this.collectionName, _id);
        return deleteDoc(docRef)
    }

} 