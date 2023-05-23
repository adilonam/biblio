import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { EmpruntService } from '../services/EmpruntService';
import { Button } from 'primereact/button';
import '../assets/style.scss'
import { EmpruntDialog } from './EmpruntDialog';
export const Emprunt = (props) => {


    const STATUS = {
        "ADD": 0,
        "EDIT": 1,
        "DELETE": 2
    }
    const [status, setStatus] = useState(null)
    const [refresh, setRefresh] = useState()
    const [displayDialog, setDisplayDialog] = useState(false)
    const empruntService = new EmpruntService();

    const [selectedRow, setSelectedRow] = useState(null);

    const [emprunts, setEmprunts] = useState([])
    useEffect(() => {


empruntService.getJoinedData().then((data)=>{
  setEmprunts(data)
  setLoading(false)
}).catch((error) => {
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

        return(<>
            <div className="p-d-block">
                <Button className="p-button p-button-sm p-button-secondary my-custom-button" onClick={()=> editClick(rowData)} icon="pi pi-pencil"></  Button>
                <Button className="p-button p-button-sm p-button-danger my-custom-button" icon="pi pi-trash" onClick={()=>deleteClick(rowData)}></Button>
            </div>
        </>)

    }
    
 const dateBody = (rowData)=>{
    return rowData.date.toString()
 }

    return (
        <>
            <DataTable value={emprunts} paginator rows={10} dataKey="uid" filterDisplay="row" loading={loading} 
                emptyMessage="Aucune inscription." size={'small'} className={"card"} header={
                    <button onClick={addClick} className="p-button p-button-sm p-button-success" icon="pi pi-plus">Add</button>}>

                <Column header="N° livre" field="numero" filter />
                <Column header="Prenom" field="prenom" filter />
                <Column header="Nom" field="nom" filter />
                <Column header="Date" field="date" filter  body={dateBody}/>
           

                <Column field="actions" header="Actions" body={actionBody} />
            </DataTable>

            <EmpruntDialog status={status} selectedRow={selectedRow} display={displayDialog}
                setDisplay={setDisplayDialog} setRefresh={setRefresh} ></EmpruntDialog>

        </>

    )
}


