
import React, { useRef, useState } from "react";
import { useFormik } from 'formik';
import { InputText } from "primereact/inputtext";
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { Password } from 'primereact/password';
import { UserService } from "../../../services/UserService";
import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';

import { Link, useNavigate } from 'react-router-dom';

export const SignIn = (props) => {


const [loading, setLoading] = useState(false)
  const toast = useRef(null);
  const userService = new UserService()

  const ToastLife = 4000


  const formik = useFormik({
    initialValues: {
        email: '',
        password:''
    },
    validate: (data) => {
        let errors = {};

        // if (!data.value) {
        //     errors.value = 'Name - Surname is required.';
        // }

        return errors;
    },
    onSubmit: (data) => {
        data && submitData(data);
    }
});

const navigate = useNavigate()

const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

const getFormErrorMessage = (name) => {
    return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
};

  const submitData = (data) => {
    setLoading(true)
    userService.signIn( data.email, data.password).then((userCredential) => {

     navigate('/')
    
    })
      .catch((error) => {
        const errorMessage = error.message;
        toast.current.show({ severity: 'error', summary: 'Erreur', detail: errorMessage.replace('Firebase:', ''), life: ToastLife });
      }).finally(()=>{
        setLoading(false)
      });

  };

  

 


  return (
    <div className="container mb-5">
    <div className="row">
        <div className="col">
        <div className="card">
            <div className="flex row md:flex-row">
                <form onSubmit={formik.handleSubmit} className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5  col  ms-4">

                    <div className="row flex align-items-center gap-2">
                        <label htmlFor="username">email</label>
                        <InputText id="username" type="email" autoComplete="username"
                         onChange={(e) => {
                            formik.setFieldValue('email', e.target.value);
                        }}
                        value={formik.values.email}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('email') })}/>
                    </div>
                    <div className="row flex align-items-center gap-2">
                        <label htmlFor="password">Password</label>
                        <Password id="password" type="password" toggleMask  autoComplete="current-password"
                        onChange={(e) => {
                            formik.setFieldValue('password', e.target.value);
                        }}
                        feedback={false}
                        value={formik.values.password}
                        className={classNames({ 'p-invalid': isFormFieldInvalid('password'), "flex-column p-0" :true })}/>
                    </div>
                    <Button loading={loading} label="Se connecter" icon="pi pi-user" type="submit" className="w-10rem mt-3" ></Button>
                </form>
                <div className="w-full md:w-2 col">
                    <Divider layout="vertical" className="hidden md:flex"><b>OR</b></Divider>
                 
                </div>
                <div className="w-full md:w-5 flex align-items-center justify-content-center py-5 col my-auto me-4 ms-2">
                <Link
                to="/inscrire"
                        className="btn"
              >  <Button label="S'inscrire"  icon="pi pi-user-plus" className="p-button-success w-10rem"></Button>
              </Link>
                  
                </div>
            </div>
        </div>
            
        </div>
    </div>
    
      <Toast ref={toast} />
    </div>

  )
}


