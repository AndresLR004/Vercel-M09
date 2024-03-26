import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { UserContext } from '../userContext';
import 'leaflet/dist/leaflet.css';
import "../App.css"
import { Icon } from "leaflet";
import { v4 as uuidv4 } from 'uuid';
import { Marker, Popup, useMapEvents, MapContainer, TileLayer, useMap } from 'react-leaflet'
import { PlacesMenu } from './PlacesMenu';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';


export const PlacesAdd = ({ setAfegir }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [coordenades, setCoordenades] = useState({ latitude: '0', longitude: '0' });
    let { authToken } = useContext(UserContext)
    var [places, setPlaces] = useState([]);
    const [position, setPosition] = useState(null)
    let placesLocal = []
    // let [ formulari,setFormulari] = useState({});
    // const [ avis, setAvis] = useState("");
    // const [error, setError] = useState("")

    useEffect(() => {

        navigator.geolocation.getCurrentPosition((pos) => {

            setCoordenades({

                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude

            })

            console.log("Latitude is :", pos.coords.latitude);
            console.log("Longitude is :", pos.coords.longitude);
        });


    }, [])

    function LocationMarker() {

        const map = useMapEvents({
            click() {
                map.locate()
            },
            locationfound(e) {
                setPosition(e.latlng)
                console.log(e.latlng);
                map.flyTo(e.latlng, map.getZoom())
            },
        })

        return position === null ? null : (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        )
    }


    const afegir = (data) => {
        console.log(data)
        let {name,description,upload,latitude,longitude,visibility}=data;
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("upload", upload[0]);
        formData.append("latitude", coordenades.latitude);
        formData.append("longitude", coordenades.longitude);
        formData.append("visibility", visibility);
        console.log(formData)


        const addPlaces = async (formData) => {
            const fetchData = await fetch("https://backend.insjoaquimmir.cat/api/places", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                method: "POST",
                body: formData
            })
            const response = await fetchData.json()

            if (response.success) {
                console.log(response)
            } else {
                console.log(response);
                alert("Catchch");
            }
        }
        addPlaces(formData)

        reset()


    }

    const tornar = (e) => {

        e.preventDefault();
        setAfegir(false);

    }


    return (
        <>
            <div className="py-9 pl-9">
                {/* <form method="post" action="" enctype="multipart/form-data"> */}
                <div className="py-9 flex flex-col gap-y-2">
                    <label className="text-gray-600" htmlFor="Name">Nom</label>
                    <input
                        type="text"
                        {...register("name", {
                            required: "Por favor, introdueix el títol",
                            maxLength: {
                                value: 99,
                                message: "Mida màxima del títol, 99 caràcters"
                            }
                        })}
                        className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
                    />
                </div>
                {errors.name && <p className="text-red-600 bg-yellow-200 p-2">{errors.name.message}</p>}

                <div className="w-1/3">
                    <label className="text-gray-600">Descripció</label>
                    <textarea
                        {...register("description", {
                            required: "Por favor, introdueix la descripció",
                            maxLength: {
                                value: 255,
                                message: "Mida màxima de la descripció, 255 caràcters"
                            }
                        })}
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
                    ></textarea>
                    {errors.description && <p className="text-red-600 bg-yellow-200 p-2">{errors.description.message}</p>}


                    <div className="mb-3 w-96">
                        <label htmlFor="formFile" className="form-label inline-block mb-2 text-gray-600">Imatge PNG, JPG or GIF (MAX. 800x400px)</label>
                        <input
                            {...register("upload", {
                                required: "Si us plau, introduex la URL d'una imatge",
                                pattern: {
                                    message: "Si us plau, introdueix una URL válida"
                                }
                            })}

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
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="upload" />
                    </div>
                    {errors.upload && <p className="text-red-600 bg-yellow-200 p-2">{errors.upload.message}</p>}


                    <span className="flex flex-col gap-y-2">
                        <label className="text-gray-600" htmlFor="Name">Longitud</label>
                        <input
                            type="text"
                            {...register("longitude", { required: "Por favor, introduce la longitud" })}
                            className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
                            value={coordenades.longitude}
                        // Això només si vulguéssim modificar manualment les coordenades
                        // onChange={(e) => setCoordenades({ ...coordenades, longitude: e.target.value })}

                        />
                    </span>
                    {errors.longitude && <p className="text-red-600 bg-yellow-200 p-2">{errors.longitude.message}</p>}

                    <span className="flex flex-col gap-y-2">
                        <label className="text-gray-600" htmlFor="Name">Latitud</label>
                        <input
                            type="text"
                            {...register("latitude", { required: "Si us plau, introdueix la latitud" })}
                            className="w-1/3 px-4 py-2 border border-gray-300 outline-none focus:border-gray-400"
                            value={coordenades.latitude}
                        // Això només si vulguéssim modificar manualment les coordenades
                        // onChange={(e) => setCoordenades({ ...coordenades, latitude: e.target.value })}
                        />
                    </span>
                    {errors.latitude && <p className="text-red-600 bg-yellow-200 p-2">{errors.latitude.message}</p>}
                    <label htmlFor="visibility" className="block mb-2 text-sm text-gray-600 dark:text-white">Selecciona la visibilitat</label>
                    <select {...register("visibility", { required: "Por favor, introdueix la latitud" })} id="visibility" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option defaultValue value="1">Public</option>
                        <option value="2">Contactes</option>
                        <option value="3">Privat</option>

                    </select>
                    <div className="py-9">
                        <button onClick={handleSubmit(afegir)} type="submit" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                            Afegir Entrada
                        </button>



                    </div>







                </div>
                {/* </form> */}
                <MapContainer style={{ height: 280 }} center={{ lat: 51.505, lng: -0.09 }} zoom={13}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />



                </MapContainer>
            </div>





        </>
    )
}
