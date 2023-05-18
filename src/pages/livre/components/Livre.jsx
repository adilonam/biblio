
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { LivreService } from '../services/LivreService';

export const Livre = (props)=> {
 const livreService = new LivreService();
 

 const [livres, setLivres] = useState([])
useEffect(() => {

 livreService.getAll() .then((querySnapshot) => {

    let _data = []
    
    querySnapshot.forEach((doc) => {
     _data.push(doc.data())
    });
    setLivres(_data)

    setLoading(false)
  })
  .catch((error) => {
    console.log("Error getting documents: ", error);
    setLoading(false)
  });


}, [])

const [loading, setLoading] = useState(true);



  return (
    <>
 <DataTable value={livres} paginator rows={10} dataKey="uid"  filterDisplay="row" loading={loading}
        emptyMessage="Aucune inscription." size={'small'} className={"fs-6"}>

    <Column field="titre" header="titre" filter  />
    <Column field="edition" header="edition" filter  />
    <Column field="nombre_exemple" header="nombre_exemple" filter  />

    <Column field="nombre_page" header="nombre_page" filter  />
    <Column field="numero" header="numero" filter  />

    
</DataTable>
        </>

  )
}


