import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";

const Principal = ({ setAuth }) => {

    const [name, setName] = useState("");

    async function getName() {
        try {
            const res = await fetch("http://localhost:5000/principal/", {
                method: "GET",
                headers: { token: localStorage.token }
            });

            const parseRes = await res.json();
            setName(parseRes.user_name);

        } catch (err) {
            console.error(err.message);
        }
    };

    const logout = e => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
        toast.success("Acaba de cerrar sesion");
    };

    useEffect(() => {
        getName();
    }, []);

    return (
        <Fragment>
            <h1> Pagina principal</h1>
            <h2>Bienvenido {name}</h2>
            <button onClick={e => logout(e)} className="btn btn-danger" >Salir</button>
        </Fragment>
    );
};

export default Principal;
