
import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { LivreService } from '../services/LivreService';
import { Button } from 'primereact/button';
import '../assets/style.scss'
import { LivreDialog } from './LivreDialog';
export const Livre = (props) => {


    const STATUS = {
        "ADD": 0,
        "EDIT": 1,
        "DELETE": 2
    }
    const [status, setStatus] = useState(null)
    const [refresh, setRefresh] = useState()
    const [displayDialog, setDisplayDialog] = useState(false)
    const livreService = new LivreService();

    const [selectedRow, setSelectedRow] = useState(null);

    const [livres, setLivres] = useState([])
    useEffect(() => {

        livreService.getAll().then((querySnapshot) => {

            let _data = []

            querySnapshot.forEach((doc) => {
                _data.push({...doc.data(), "id" : doc.id})
            });
            setLivres(_data)

            setLoading(false)
        })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                setLoading(false)
            });


    }, [refresh])



    const addClick = (e) => {
        setStatus(STATUS.ADD)
        setDisplayDialog(true)
    }


    const editClick = (rowData) => {
            setStatus(STATUS.EDIT)
            setDisplayDialog(true)
      setSelectedRow(rowData)


    }
    const deleteClick = (rowData) => {
        setSelectedRow(rowData)
            setStatus(STATUS.DELETE)
            setDisplayDialog(true)
     
    }





    const [loading, setLoading] = useState(true);

    const actionBody = (rowData)=>
    {

return    (<><div className="p-d-block"><Button className="p-button p-button-sm p-button-secondary my-custom-button" onClick={()=> editClick(rowData)} icon="pi pi-pencil"></  Button><Button className="p-button p-button-sm p-button-danger my-custom-button" icon="pi pi-trash" onClick={()=>deleteClick(rowData)}></Button></div></>)

    }
    
 

    return (
        <>
            <DataTable value={livres} paginator rows={10} dataKey="uid" filterDisplay="row" loading={loading} 
                emptyMessage="Aucune inscription." size={'small'} className={"card"} header={
                    <button onClick={addClick} className="p-button p-button-sm p-button-success" icon="pi pi-plus">Add</button>}>

                <Column field="titre" header="titre" filter />
                <Column field="edition" header="edition" filter />
                <Column field="nombre_exemple" header="nombre_exemple" filter />

                <Column field="nombre_page" header="nombre_page" filter />
                <Column field="numero" header="numero" filter />
                <Column field="auteur" header="auteur" filter />

                <Column field="actions" header="Actions" body={actionBody} />
            </DataTable>


            <LivreDialog status={status} selectedRow={selectedRow} display={displayDialog}
                setDisplay={setDisplayDialog} setRefresh={setRefresh} ></LivreDialog>

        </>

    )
}


