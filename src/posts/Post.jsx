import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../userContext";
import "leaflet/dist/leaflet.css";

import "../App.css";
import { Icon } from "leaflet";

import { Marker, Popup, MapContainer, TileLayer, useMap } from "react-leaflet";
import { PostsMenu } from "./PostsMenu";
import { CommentAdd } from "./comments/CommentAdd";
import { CommentsList } from "./comments/CommentsList";

// import { useSpeechSynthesis } from 'react-speech-kit';

export const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  let { authToken } = useContext(UserContext);

  let [post, setPost] = useState({});
  let [isLoading, setIsLoading] = useState(true);
  let [liked, setLiked] = useState(false);
  let [likes, setLikes] = useState(0)
  let [img, setImg] = useState("")

  // -------------------------------------------
  // const { speak } = useSpeechSynthesis();

  
  // let index=-1
  //let trobats = posts.filter(objecte => objecte.id === id);

  // for (let v in posts)
  // if(posts[v].id === id) index=v

  useEffect(() => {
    const show = async () => {
      try {
        const data = await fetch("https://backend.insjoaquimmir.cat/api/posts/"+ id, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          method: "GET",
        })
        const response = await data.json();

        if (response.success) {
          console.log(response)
          setPost(response.data)
          setImg("https://backend.insjoaquimmir.cat/storage/" + response.data.file.filepath)
          setIsLoading(false)
        } else {
          console.log(response)
          alert ("Error al obtener los datos de la API1")
        }
      } catch (error) {
        console.log("Error al obtener los datos de la API2")
      }
    }
  show();
  }, []);


  // ----------------------------------------------------

  // const handleDoubleClick = () => {
  //       const textsToSpeak = [
  //           post.description || '-',
  //           `Latitud: ${post.latitude || '-'}`,
  //           `Longitud: ${post.longitude || '-'}`,
  //       ];

  //       textsToSpeak.forEach(text => {
  //           speak({ text });
  //       });
  //   };

  // const handleSpeakUsername = () => {
  //   speak({ text: `Estás identificado como ${username}` });
  // };

  
  // useEffect(() => {
  //   const handleKeyDown = e => {
  //     if (e.ctrlKey && e.altKey && e.key === 's') {
  //       handleSpeakUsername();
  //     }
  //   };
  //   window.addEventListener('keydown', handleKeyDown);
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [handleSpeakUsername]);

  // ---------------------------------------------------------------

  // useEffect ( ()=> {
  
  // if (posts[index].likes == undefined)
  // {
  //       posts[index].likes=[]
  //       console.log(posts[index])

  // }
  // else {
  //     // Calculem el total
  //     setLikes(posts[index].likes.length)

  //     // Caldrio mirar si ja existeixen favorits meus
  //     for (let v in posts[index].likes)
  //     { 
  //       console.log(posts[index].likes[v])
  //       if(posts[index].likes[v] == authToken.email) 
  //       {
  //         setLiked(true)
  //       }
  //     }



  // }

  //   setPost(posts[index])
  //   setIsLoading(false)

  // },[])


  // const position = [43.92853, 2.14255];

  // const deletePost = (id,e) => {

  //   let confirma = confirm("Estas  segur?")
  
  //   if (confirma)
  //   {
  //     let nouArray = posts.filter(objecte => objecte.id !== id);
  //     localStorage.setItem('posts', JSON.stringify(nouArray));

  //     // Caldrà esborrar els reviews per a aquest post
  //     let reviews =  JSON.parse(localStorage.getItem('reviews')) || []
  //     let nouArray2 = reviews.filter(objecte => objecte.id_post !== id);
  //     localStorage.setItem('reviews', JSON.stringify(nouArray2));





  //     navigate("/posts/")
  //     //setPosts(nouArray)
  //     // Esborrem de l'array l'element i actualitem localstorage
      
  //   }
  
  // }

  // const likke = (id,e)=> {

  //     e.preventDefault()
  //     console.log(posts[index])

  //     // index, és l'index de posts que hem de modificar      
  //     if (posts[index].likes == undefined)
  //     {
  //       posts[index].likes = []  
  //     }
  //     posts[index].likes.push(authToken.email)

  //     localStorage.setItem('posts', JSON.stringify(posts));

    
  //     setLiked(true)
  //     setLikes(likes+1)

      
  //     console.log(posts[index])



  // }
  // const unlikke = (id,e)=> {

  //   e.preventDefault()

  //   console.log("ddsdssds")
  //   if (posts[index].likes == undefined)
  //     {  //Aquí no s'hauria d'arrivar
  //       console.log("mal si entres aqui")
  //       posts[index].likes = []  
  //     }
  //   else {
  //     console.log("BÉ!! si entres aqui")

  //     let trobats = posts[index].likes.filter(objecte => objecte != authToken.email && objecte != null);
  //     console.log(trobats)
  //     posts[index].likes = [...trobats]
  //     localStorage.setItem('posts', JSON.stringify(posts));
  //     console.log(posts[index].likes)
  //     setLiked(false)
  //     setLikes(likes - 1)
  

  //   }

  // }
  

  return (
    <>
     
      {isLoading ? (
        "Espera...."
      ) : (
        <>
          <div className="md:grid md:grid-col-1 md:grid-flow-row gap-4 md:mx-auto p-6 justify-center dark:bg-gray-900 dark:text-gray-100">
            <div className="relative overflow-hidden bg-no-repeat bg-cover col-span-1 ">
              <img
                src={
                  img
                }
                alt=""
                className=" col-span-1 w-200 h-96 items-center"
              />

              <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-40 transition duration-300 ease-in-out bg-white"></div>
            </div>

            <div className="max-w-xl">
             
              <span className="bg-blue-200 col-span-1 block pb-2 text-sm dark:text-gray-400">
                Enviada per: {post.author.name}
              </span>
              <span className="self-center   px-9 bg-gray-200 col-span-2 text-x2 font-semibold">
                Latitud: {post.latitude}{" "}
              </span>
              <span className="self-center px-7 bg-gray-200 text-x2 font-semibold">
                Longitud: {post.longitude}
              </span>

              <div className="bg-orange-100 py-3 text-x2 font-semibold">
                Descripció
              </div>
              <p className=" bg-yellow-100">{post.body}</p>
              <div className="mt-10 h-12 max-h-full md:max-h-screen">
               

                {post.author.email === authToken.email ? (
                  <>
                    <Link
                      to={"/posts/edit/" + id}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mt-10 px-4 h-10 md:h-10 uppercase"
                    >
                      {" "}
                      Editar{" "}
                    </Link>
                    <a
                      href="#"
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                      onClick={(e) => deletePost(id, e)}
                    >
                      {" "}
                      Esborrar
                    </a>
                  </>
                ) : (
                  <></>
                )}
                {liked ? (
                  <a
                    href="#"
                     onClick={(e) => unlikke(id, e)}
                    className="bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  >
                    - ❤️ {likes}
                  </a>
                ) : (
                  <a
                    href="#"
                    onClick={(e) => likke(id, e)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 h-10 md:h-10 uppercase"
                  >
                    + ❤️ {likes}
                  </a>
                )}

             
                { <CommentsList
                  id={post.id}
                  // reviews_count={post.reviews_count}
                /> }
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
