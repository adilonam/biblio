

import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';

import { classNames } from 'primereact/utils';
import { LivreService } from '../services/LivreService';

export const LivreDialog = (props) => {
    const toast = useRef(null)
    const initData = {        
        "titre": "",         
        "edition": "",
        "nombre_exemple": "",
        "nombre_page": "",
        "numero": "",
        "auteur":""
      
}





useEffect(() => {

    if(props.display){
        if( props.status == 1 || props.status == 2 ){
            formik.setValues(props.selectedRow)
            }
            else{
                formik.setValues(initData)
            }
    }

    
}, [props.display])




const formik = useFormik({
    initialValues: initData,
    validate: (data) => {
      let errors = {};


      //check is empty
    //  Object.keys(initData).forEach(element => {
    //     if (!data[element]) {
    //       errors[element] = `Ce champ est requis !`
    //     }
    //   });


      return errors;
    },
    onSubmit: (data) => {
      data && submitData(data);

    }
  });


  const [loading, setLoading] = useState(false)



const toastLife = 4000


    const switchStatus = (addString, modifyString, deleteString) => {
        if (props.status == 1)
            return modifyString
        if (props.status == 2)
            return deleteString
        if (props.status == 0)
            return addString
    }

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
      return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };


 
    const renderFooter = () => {
        let _label = switchStatus("Ajouter", "Modifier", "Supprimer")
        let _className = switchStatus("p-button-success", "p-button-warning", "p-button-danger")
        return (
            <div>
                <Button label="Annuler" icon="pi pi-times" onClick={() => onHide(false)} className="p-button-text" />
                <Button label={_label} icon="pi pi-check" className={_className} onClick={formik.submitForm} autoFocus loading={loading}/>
            </div>
        );
    }


    const onHide = (value) => {
        props.setDisplay(value)
    }


 
    

    const customInputText = (field, label) => {

        return (<> <span className="p-float-label mt-1">
          <InputText
            id={field}
            name={field}
            value={formik.values[field]}
            onChange={(e) => {
              formik.setFieldValue(field, e.target.value);
            }}
            className={classNames({ 'p-invalid': isFormFieldInvalid(field), 'w-75': true })}
          />
          <label htmlFor={field}>{label}</label>   </span>
          {getFormErrorMessage(field)}
        </>
    
    
        )
      }




 
const livreService = new LivreService()
      
    const submitData = (data) => {
        let _summary = switchStatus("Ajouter avec succès", "Modifié avec succès", "Supprimer avec succès")
       
        setLoading(true)
      


        const successPost= ()=>{
            toast.current.show({ severity: 'success', summary: _summary, life: toastLife });
            onHide(false)
            props.setRefresh({...data})
            setLoading(false)
        }
        const failedPost = ()=>{
            toast.current.show({ severity: 'error', summary: "Erreur", life: toastLife });
            setLoading(false)
        }


        switch (props.status) {
            case 0:
              
                livreService.create(data).then((resp) => {
                successPost()
                }).catch((err)=>{
                  failedPost()
                })
                break;
                case 1:
                    livreService.update(data).then((resp) => {
                    successPost()
                    }).catch((err)=>{
                    failedPost()
                })
                    break;
                    case 2:
                        livreService.delete(data).then((resp) => {
                    successPost()
                        }).catch((err)=>{
                     failedPost()
                })
                        break;
        
            default:
                break;
        }
    }


  
    const formClass =  "form-group col-8 mt-2"
 

    return (
        <>
            <Toast ref={toast} />
            <Dialog header={() => switchStatus("Ajouter un Livre", `Modifier Livre N° ${props.selectedRow?.numero}`,
                `Supprimer Livre N° ${props.selectedRow?.numero}`)}

                visible={props.display} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => props.setDisplay(false)}>

            
                {!(props.status == 2) &&    
               

               <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2 ">
                    <div className="p-fluid p-formgrid p-grid">
                           

                  
	        {customInputText("titre", "Titre")}
            {customInputText("edition", "Edition")}
            {customInputText("nombre_exemple", "Nb exemple")}
            {customInputText("nombre_page", "Nb page")}
            {customInputText("numero", "Numero")}
            {customInputText("auteur", "Auteur")}
	                

                  
               
                       

                      
                                    



                    </div>
  
                            
            
</form>
                }


            </Dialog>

        </>
    )
  

}