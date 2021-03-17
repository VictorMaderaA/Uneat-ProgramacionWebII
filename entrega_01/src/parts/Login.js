import React, {useState} from 'react';
import {exists, login, register} from "../services/auth";
import {useHistory} from "react-router-dom";

function Login() {

    const history = useHistory();
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    // eslint-disable-next-line
    // const [verificationCode, setVerificationCode] = useState('');
    const [userState, setUserState] = useState(0);
    const [name, setName] = useState('');

    // Step: 1 User, 2 Password, 3 Confirmation, 4 VerCode
    const [step, setStep] = useState(1);


    const handleUserChange = (newVal) => {
        setUser(newVal);
    }
    const handlePasswordChange = (newVal) => {
        setPassword(newVal);
    }
    const handlePasswordConfirmationChange = (newVal) => {
        setPasswordConfirmation(newVal);
    }

    const handleNameChange = (newVal) => {
        setName(newVal);
    }
    // const handleVerificationCodeChange = (newVal) => {
    //     setVerificationCode(newVal);
    // }

    const handleBackClick = () => {
        if (step === 2) {
            setStep(1);
        } else if (step === 3) {
            setStep(2);
        } else if (step === 4) {
            setStep(1);
        }
    }

    const handleContinueClick = (event = undefined) => {
        if (typeof event !== "undefined") {
            event.preventDefault
        }
        if (step === 1) {
            exists(user, 'email')
                .then(r => {
                    if (r.status === 200) {
                        return r.json()
                    }
                }).then(r => {
                if (r.value === true) {
                    setUserState(1)
                    setStep(2)
                    console.log('User is registered')
                } else {
                    setUserState(0)
                    setStep(2)
                    console.log('User is Not registered')
                }
            })
        } else if (step === 2) {
            if (userState === 1) {
                login(user, password)
                    .then(r => {
                        if (r.status >= 200 && r.status < 300) {
                            return r.json()
                        }
                    })
                    .then(r => {
                        window.localStorage.setItem('token', r.access_token)
                        history.goBack();
                    })
            } else if (userState === 0) {
                setStep(3)
            }
        } else if (step === 3) {
            register(user, password, passwordConfirmation, name)
                .then(r => {
                    if (r.status === 200) {
                        return r.json()
                    }
                })
                .then(r => {
                    setStep(1)
                })
        } else if (step === 4) {

        }
    }

    const Input = () => {
        if (step === 1) {
            return <InputEmailPhone onInputChange={handleUserChange}/>
        } else if (step === 2) {
            return <InputPassword onInputChange={handlePasswordChange}/>
        } else if (step === 3) {
            return <InputPasswordConfirmation onInputChange={handlePasswordConfirmationChange}
                                              onInputChangeName={handleNameChange}/>
        }
        // else if (step === 4) {
        //     return <InputVerificationCode onInputChange={handleVerificationCodeChange}/>
        // }
    }


    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleContinueClick()
            }}>
                <div className="form-group">
                    {Input()}
                </div>
            </form>
            <button hidden={step === 1} onClick={handleBackClick} className={'btn btn-danger m-2'}>Volver</button>
            <button onClick={handleContinueClick} className={'btn btn-primary m-2'}>Continuar</button>
        </div>
    );
}

function InputEmailPhone(props) {
    //Set Email or Phone Number

    const handleChange = (event) => props.onInputChange(event.target.value);

    return (
        <div className="form-group">
            <label htmlFor="userInput">Correo electrónico</label>
            <input className="form-control" id="userInput" aria-describedby="userHelp" onSubmit={e => {
                e.preventDefault();
            }}
                   placeholder="Introduce tu correo" type='text' onChange={handleChange}/>
        </div>
    )
}

function InputPassword(props) {
    //Set Password

    const handleChange = (event) => props.onInputChange(event.target.value);

    return (
        <div className="form-group">
            <label htmlFor="passwordInput">Contraseña</label>
            <input className="form-control" id="passwordInput" aria-describedby="passwordHelp" onSubmit={e => {
                e.preventDefault();
            }}
                   placeholder="Introduce tu contraseña" type='password' onChange={handleChange}/>
        </div>
    )
}

function InputPasswordConfirmation(props) {
    //Set Password Confirmation

    const handleChange = (event) => props.onInputChange(event.target.value);
    const handleChangeName = (event) => props.onInputChangeName(event.target.value);

    return (
        <div className="form-group">
            <label htmlFor="passwordInput">Repite la contraseña</label>
            <input className="form-control" id="passwordInput" aria-describedby="passwordHelp" onSubmit={e => {
                e.preventDefault();
            }}
                   placeholder="Introduce tu contraseña" type='password' onChange={handleChange}/>
            <br/>
            <br/>
            <label htmlFor="passwordInput">Ingresa tu nombre de Pila</label>
            <input className="form-control" id="userInput" aria-describedby="userHelp" onSubmit={e => {
                e.preventDefault();
            }}
                   placeholder="Introduce tu nombre" type='text' onChange={handleChangeName}/>
        </div>
    )
}


export default Login;