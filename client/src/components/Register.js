import React, { Fragment, useState } from "react";
import { Card, CardBody } from 'reactstrap';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: ""
    });

    const { name, email, password } = inputs;

    const onChange = e =>
        setInputs({ ...inputs, [e.target.name]: e.target.value });

    const onSubmitForm = async e => {
        e.preventDefault();

        try {
            const body = { email, password, name };
            const response = await fetch("http://localhost:5000/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            );

            const parseRes = await response.json();
            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Registro exitoso");
            } else {
                setAuth(false);
                toast.error(parseRes);
            }

        } catch (err) {
            console.error(err.message)
        }
    }

    return (

        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Card className="bg-secondary">
                        <CardBody>
                            <h1 className="text-center text-white" >Registrarse</h1>
                            <Fragment>
                                <form onSubmit={onSubmitForm}>
                                    <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        placeholder="Escriba su nombre"
                                        onChange={e => onChange(e)}
                                        className="form-control my-3"
                                    />
                                    <input
                                        type="text"
                                        name="email"
                                        value={email}
                                        placeholder="Escriba su email"
                                        onChange={e => onChange(e)}
                                        className="form-control my-3"
                                    />
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        placeholder="Escriba su contraseña"
                                        onChange={e => onChange(e)}
                                        className="form-control my-3"
                                    />

                                    <button className="btn btn-success bnt-block form-control my-3" >Registrar</button>
                                </form>
                                <Link to="/login" className="btn btn-info btn-block" >Inicio de sesión</Link>

                            </Fragment>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>




    );
};

export default Register;