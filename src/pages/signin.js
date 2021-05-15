import Head from "@components/Head";
import Cookies from "js-cookie";
import Router from "next/router";
import { useState } from "react";
import jwt from "jsonwebtoken";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data && data.error) {
          setSignupError(data.message);
        }
        if (data && data.token) {
          jwt.verify(data.token, process.env.JWT_SECRET, (err, d) => {
            Cookies.set("hackupc-token", data.token, { expires: 20000 });
            Router.push("/");
          });
        }
      });
  };

  return (
    <div className="">
      <Head />
      <div className="">
        <h1>Iniciar sesión</h1>
        <div className="">
          <p>Correo electrónico</p>
          <input
            type="email"
            placeholder="Correo..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="">
          <p>Contraseña</p>
          <input
            type="password"
            placeholder="Contraseña..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p>{!!signupError && signupError}</p>
        <button onClick={signIn}>Iniciar sesión</button>
      </div>
    </div>
  );
};

export default Login;
