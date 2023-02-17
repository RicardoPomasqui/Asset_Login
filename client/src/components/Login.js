import React, { Fragment, useState } from "react";
import { Card, CardBody } from 'reactstrap';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


const Login = ({ setAuth }) => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    });

    const { email, password } = inputs;

    const onChange = e => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async e => {
        e.preventDefault();
        try {

            const body = { email, password }

            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Inicio de sesion exitoso");
            } else {
                setAuth(false);
                toast.error(parseRes);
            }

        } catch (err) {
            console.error(err.message);
        }
    };

    return (

        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <Card className="bg-secondary">
                        <CardBody>
                        <h1 className="text-center text-white" >Inicio de sesion</h1>
                            <Fragment>
                               
                                <form onSubmit={onSubmitForm}>
                                    <input type="email" name="email" placeholder="Escriba su Email" className="form-control my-3" value={email} onChange={e => onChange(e)} />
                                    <input type="password" name="password" placeholder="Escriba su contraseña" className="form-control my-3" value={password} onChange={e => onChange(e)} />
                                    <button className="btn btn-success btn-block">Iniciar Sesión</button>
                                </form>
                                <br />
                                <Link to="/register" className="btn btn-info btn-block" >Regitrarse</Link>
                            </Fragment>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>





    );
};

export default Login;