import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../userContext";

export const Register = ({ setLogin }) => {

    let { usuari, setUsuari, authToken, setAuthToken } = useContext(UserContext)

    const {
        register,
        handleSubmit,
        getValues,
        setError,
        formState: { errors },
    } = useForm();

    let usuaris = [];

    usuaris = JSON.parse(localStorage.getItem("usuaris")) || [];
    console.log(usuaris)

    const doRegister = (data) => {
        try {
            const { name, email, password } = data

            const register = async () => {
                const data = await fetch("https://backend.insjoaquimmir.cat/api/register", {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({ name, email, password })
                })
                const response = await data.json();
                console.log(response)

                if (response.success) {
                    localStorage.setItem('authToken', JSON.stringify(response.authToken));
                    setAuthToken(response.authToken);
                }

            }
            register()
        } catch (error) {
            console.log(response);
            alert("Cathchch");
        }

    };


    return (
        <section className="absolute top-1/2 left-1/2 mx-auto max-w-sm -translate-x-1/2 -translate-y-1/2 transform space-y-4 text-center">
            <div x-show="isLoginPage" className="space-y-4">
                <header className="mb-3 text-2xl font-bold">Crea Usuari</header>

                <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input
                        type="text"
                        {...register("name", {
                            required: "Aquest camp és obligatori"
                        })}
                        placeholder="Name"
                        className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
                    />
                </div>
                <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input
                        type="text"
                        {...register("email", {
                            required: "Aquest camp és obligatori",
                            pattern: {  // Expressió regular per a e-mail
                                value: /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
                                message: "Si us plau, introdueix un correu vàlid"
                            }

                        })}
                        placeholder="Email"
                        className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
                    />
                </div>
                {errors.email && <div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">
                    {errors.email.message}
                </div>}
                {errors.duplicatedUser && <div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">
                    {errors.duplicatedUser.message}
                </div>}
                <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input
                        type="password"
                        {...register("password", {
                            validate: (value) =>
                                value === getValues("password2") ||
                                "Els passwords han de coincidir",
                            required: "Aquest camp és obligatori",
                            minLength: {
                                value: 8,
                                message: "La contrasenya ha de tenir al menys 8 caràcters",
                            },
                            maxLength: {
                                value: 20,
                                message: "La contrasenya ha de tenir com a màxim 20 caràcters",
                            },
                            pattern: {
                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                                message:
                                    "La contrasenya ha de contenir al menys una minúscula, una majúscula, i un número",
                            },
                        })}
                        placeholder="Password"
                        className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
                    />
                </div>
                <div className="w-full rounded-2xl bg-gray-50 px-4 ring-2 ring-gray-200 focus-within:ring-blue-400">
                    <input
                        type="password"
                        {...register("password2")}
                        // No cal validate, ni cap altre element en aquest, ja que saltarà l'error sempre en el camp anterior
                        placeholder="Repeat Password"
                        className="my-3 w-full border-none bg-transparent outline-none focus:outline-none"
                    />
                </div>
                {errors.password ? (
                    <div className="flex w-full items-center space-x-2 rounded-2xl bg-red-50 px-4 ring-2 ring-red-200 ">
                        {errors.password.message}
                    </div>
                ) : (
                    <></>
                )}
                <button
                    onClick={handleSubmit(doRegister)}
                    className="w-full rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400"
                >
                    CREA COMPTE
                </button>

                <div className="mt-8 text-sm text-gray-400">
                    <button onClick={() => setLogin(true)} className="underline">
                        Ja registrat?
                    </button>
                </div>
            </div>
        </section>
    );
};
