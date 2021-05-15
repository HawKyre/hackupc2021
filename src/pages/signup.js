import Head from "@components/Head";
import Cookies from "js-cookie";
import Router from "next/router";
import { useState } from "react";
import jwt from "jsonwebtoken";
import { getUnisListFromDB } from "@models/university";

const Signup = () => {
  const [signupError, setSignupError] = useState("");
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    university: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setRegisterForm((p) => {
      return {
        ...p,
        [name]: value,
      };
    });
  };

  const signUp = (e) => {
    e.preventDefault();
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerForm),
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
        <h1>Registrarse</h1>
        <div className="">
          <p>Correo electrónico</p>
          <input
            name="email"
            value={registerForm.email}
            type="email"
            placeholder="Correo..."
            onChange={handleChange}
          />
        </div>
        <div className="">
          <p>Nombre de usuario</p>
          <input
            name="username"
            value={registerForm.username}
            type="email"
            placeholder="Correo..."
            onChange={handleChange}
          />
        </div>
        <div className="">
          <p>Contraseña</p>
          <input
            name="password"
            value={registerForm.password}
            type="password"
            placeholder="Contraseña..."
            onChange={handleChange}
          />
        </div>
        <div className="">
          <p>Universidad</p>
          <input
            name="university"
            value={registerForm.university}
            type="text"
            placeholder="Universidad..."
            onChange={handleChange}
          />
        </div>
        <p>{!!signupError && signupError}</p>
        <button onClick={signUp}>Crear cuenta</button>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const universities = await getUnisListFromDB();
  console.log(universities);

  return {
    props: {},
  };
}

export default Signup;
