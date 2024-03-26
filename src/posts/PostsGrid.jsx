import React, { useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../userContext';
import editar from "../assets/editar.png"
import esborrar from "../assets/esborrar.png"

// Temporal
//import posts from '../../json/posts.json'
//import users from '../../json/users.json'
import { PostsAdd } from './PostsAdd'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PostGrid } from './PostGrid';

export const PostsGrid = () => {

  // desa el retorn de dades de l'api posts
  // let [ posts, setPosts ] = useState([]);
  let [ posts, setPosts ] = useState([]);
  // Ho utilitzem per provar un refresc quan esborrem un element
  let [refresca,setRefresca] = useState(false)
  // Dades del context. Ens cal el token per poder fer les crides a l'api
  let { usuari, setUsuari,authToken,setAuthToken } = useContext(UserContext)
  
  // console.log(posts)
  
  
  useEffect(() => {
    const griding = async () => {
      try {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          method: "GET",
        });
        const response = await data.json();

        if (response.success) {
          setPosts(response.data)
        } else {
          console.log(response)
          alert("Error al obtener los datos de la api")
        }
      } catch (error) {
        console.log("Error al obtener datos de la api:", error)
        alert("Error al obtener los datos de la api")
      }
    }
    griding();
  }, []);

  // Esborrar un element
  const deletePost = (id,e) => {

    let confirma = confirm("Estas  segur?")
  
    if (confirma)
    {
      let nouArray = posts.filter(objecte => objecte.id !== id);
      localStorage.setItem('posts', JSON.stringify(nouArray));
      setPosts(nouArray)
      // Esborrem de l'array l'element i actualitem localstorage
    }
  }

  return (
   <>
<div className="py-16 bg-gradient-to-br from-green-50 to-cyan-100">  
  <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
      <div className="mb-12 space-y-2 text-center">
        <span className="block w-max mx-auto px-3 py-1.5 border border-green-200 rounded-full bg-green-100 text-green-600 text-4x1">Llistat de Llocs</span>
        {/* <h2 className="text-2xl text-cyan-900 font-bold md:text-4xl">Sharing is Caring</h2>
        <p className="lg:w-6/12 lg:mx-auto">Quam hic dolore cumque voluptate rerum beatae et quae, tempore sunt, debitis dolorum officia aliquid explicabo? Excepturi, voluptate?</p> */}
      </div>

      

          <div className="grid gap-12 lg:grid-cols-2">
          { posts.map( (v,i)=> { return (   
                       
            <>
            { v.visibility.id == 1 || v.author.email == usuari ? ( <PostGrid   deletePost={ deletePost } key={v.id} v={v}/>) : <></> }
           
          
            </>
       
        )})}
      </div>
  </div>
</div>
</>
  )
}
