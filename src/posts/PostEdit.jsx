import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { useContext } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../userContext';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';


export const PostEdit = () => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    const { authToken } = useContext(UserContext);
    const [error, setError] = useState('');
    const [formulari, setFormulari] = useState({
        name: '',
        body: '',
        longitude: '',
        latitude: '',
        visibility: '',
    });
    const [uploadFile, setUploadFile] = useState(null);
    const [coordenades, setCoordenades] = useState({ latitude: '0', longitude: '0' });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [post, setPost] = useState()

    const handleFileChange = (e) => {
      const file = e.target.files[0]; // Obtener el archivo seleccionado del evento
    
      // Verificar si se seleccionó un archivo
      if (file) {
        setUploadFile(file); // Actualizar el estado con el archivo seleccionado
      }
    };

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormulari({
          ...formulari,
          [name]: value
      });
  };
  const getPost = async (e) => {
    try {
      const data = await fetch("https://backend.insjoaquimmir.cat/api/posts", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        method: "GET",
      })
      const resposta = await data.json();
      if (resposta.success === true) {
        setPost(resposta.data);
      }else{
        console.log("La resposta no ha triomfat");
      }            
    } catch {
      console.log("Error");
    }
  };
  
  const editar = async () => {
    try {
      const formData = new FormData();
      formData.append("body", formulari.body);
      if (uploadFile) {
        formData.append("upload", uploadFile);
      }
      formData.append("latitude", coordenades.latitude);
      formData.append("longitude", coordenades.longitude);
      formData.append("visibility", formulari.visibility);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
  
      const response = await fetch("https://backend.insjoaquimmir.cat/api/posts/" + id, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: formData
      });
  
      const responseData = await response.json();
  
      if (response.success) {
        setSuccessMessage('¡El formulario se ha enviado con éxito!');
        reset();
        setUploadFile(null);
      } else {
        setErrorMessage(responseData.message || 'Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error al enviar el formulario');
    }
  };
  
    
   useEffect( ()=> {
      
    navigator.geolocation.getCurrentPosition( (pos )=> {
  
      setCoordenades({
  
        latitude :  pos.coords.latitude,
        longitude: pos.coords.longitude
    
      })
      
      console.log("Latitude is :", pos.coords.latitude);
      console.log("Longitude is :", pos.coords.longitude);
    });
    
  
   },[])

   
  return (
   
    <>
    {/* Resto del código del formulario */}
     <div className="py-9 pl-9">


    
    {/* <form method="post" action="" enctype="multipart/form-data"> */}
    {/* <div className="py-9 flex flex-col gap-y-2">
        <label className="text-gray-600" htmlFor="Name">Nom</label>
        <input
            type="text"
            name="name"
            value= { formulari.name }
            className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
            onChange={ handleChange}
        />
    </div> */}

    <div className="w-1/3">
  <label className="text-gray-600">Descripció</label>
  <textarea
    name="body"
    value= { formulari.body }
    className="
      w-full
      h-32
      px-4
      py-3
      border-2 border-gray-300
      rounded-sm
      outline-none
      focus:border-blue-400
    "
    placeholder="Explica'ns alguna cosa d'aquest lloc..."
    onChange={ handleChange}
  ></textarea>

<div className="flex justify-center">
  <div className="mb-3 w-96">
    <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-600">Imatge PNG, JPG or GIF (MAX. 800x400px)</label>
    <input name="upload" 
    onChange={handleFileChange}    // value= { formulari.upload }
    className="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="upload"/>
  </div>
</div>

<span className="flex flex-col gap-y-2">
  <label className="text-gray-600" htmlFor="Name">Longitud</label>
  <input
    type="text"
    value={coordenades.longitude}
    className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
    readOnly
  />
</span>
<span className="flex flex-col gap-y-2">
  <label className="text-gray-600" htmlFor="Name">Latitud</label>
  <input
    type="text"
    value={coordenades.latitude}
    className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
    readOnly
  />
</span>

<label htmlFor="visibility" className="block mb-2 text-sm text-gray-600 dark:text-white">Selecciona la visibilitat</label>
<select name="visibility" value= { formulari.visibility } id="visibility" onChange={ handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
  <option defaultValue value="">----</option>
  <option  value="1">Public</option>
  <option value="2">Contactes</option>
  <option value="3">Privat</option>
  
</select>
<div className="py-9">
{ error ? (<div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 mb-4 px-4 ring-2 ring-red-200 ">{error}</div>) : (<></>)  }
<button onClick={editar}  type="submit" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
    Editar Entrada
    </button>
    <button onClick={ ()=> {navigate(-1)}}  type="submit" className=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
    Cancelar
    </button>
    
  </div>
        
    </div>
    {/* </form> */}
   
    </div>
    
    </>
  )
}