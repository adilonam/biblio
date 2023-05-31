import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { UserServices } from '../services/UserServices';
import { Button } from 'primereact/button';
//import '../assets/style.scss'
import { UserDialog } from './UserDialog';
export const User = (props) => {


    const STATUS = {
        "ADD": 0,
        "EDIT": 1,
        "DELETE": 2
    }
    const [status, setStatus] = useState(null)
    const [refresh, setRefresh] = useState()
    const [displayDialog, setDisplayDialog] = useState(false)
    const userService = new UserServices();

    const [selectedRow, setSelectedRow] = useState(null);

    const [users, setUsers] = useState([])
    useEffect(() => {

        userService.getAll()
            .then((querySnapshot) => {

                let _data = []

                querySnapshot.forEach((doc) => {
                    _data.push({...doc.data(), "id" : doc.id})
                });
                setUsers(_data)

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

        return(<>
            <div className="p-d-block">
                <Button className="p-button p-button-sm p-button-secondary my-custom-button" onClick={()=> editClick(rowData)} icon="pi pi-pencil"></  Button>
                <Button className="p-button p-button-sm p-button-danger my-custom-button" icon="pi pi-trash" onClick={()=>deleteClick(rowData)}></Button>
            </div>
        </>)

    }
    
 

    return (
        <>
            <DataTable value={users} paginator rows={10} dataKey="uid" filterDisplay="row" loading={loading} 
                emptyMessage="Aucune inscription." size={'small'} className={"card"} header={
                    <button onClick={addClick} className="p-button p-button-sm p-button-success" icon="pi pi-plus">Add</button>}>
                    <Column field="nom" header="nom" filter />
                    <Column field="prenom" header="prenom" filter />
                    <Column field="adresse" header="adresse" filter />
                    <Column field="status" header="status" filter />
                    <Column field="email" header="email" filter />
                    <Column field="actions" header="Actions" body={actionBody} />
            </DataTable>

            <UserDialog status={status} selectedRow={selectedRow} display={displayDialog}
                setDisplay={setDisplayDialog} setRefresh={setRefresh} >
            </UserDialog>

        </>

    )
}


