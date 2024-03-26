import React, { useState } from 'react'
import { useContext } from 'react';
import { UserContext } from '../userContext';
import editar from "../assets/editar.png"
import esborrar from "../assets/esborrar.png"

// Temporal
//import places from '../../json/places.json'
//import users from '../../json/users.json'
import { PlacesAdd } from './PlacesAdd'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlaceGrid } from './PlaceGrid';

export const PlacesGrid = () => {

    // desa el retorn de dades de l'api places
    var [places, setPlaces] = useState([]);

    // Ho utilitzem per provar un refresc quan esborrem un element
    let [refresca, setRefresca] = useState(false)
    // Dades del context. Ens cal el token per poder fer les crides a l'api
    let { usuari, authToken } = useContext(UserContext)

    console.log(usuari);
    useEffect(() => {
        const gridPlaces = async () => {
            const data = await fetch("https://backend.insjoaquimmir.cat/api/places", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                method: "GET",
            })
            const response = await data.json()

            if (response.success) {
                setPlaces(response.data);
            } else {
                console.log(response);
                alert("Catchch");
            }
        }
        gridPlaces()

    }, [])

    // Esborrar un element
    const deletePlace = (id, e) => {

        let confirma = confirm("Estas  segur?")

        if (confirma) {
            let nouArray = places.filter(objecte => objecte.id !== id);
            localStorage.setItem('places', JSON.stringify(nouArray));
            setPlaces(nouArray)
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
                        {places.map((v) => {
                            return (
                                <>
                                    {v.visibility.id == 1 || v.author.name == usuari ?  (<PlaceGrid deletePlace={deletePlace} key={v.id} v={v} />) : <></>}

                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
