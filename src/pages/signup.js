import Head from "@components/Head";
import Cookies from "js-cookie";
import Router from "next/router";
import { useState } from "react";
import jwt from "jsonwebtoken";
import { getUnisListFromDB } from "@models/university";

const Signup = ({ uniList }) => {
  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    university: "",
  });

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
          {uniList.map((x) => {
            return <p className="">{x}</p>;
          })}
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
    props: {
      uniList: universities.map((x) => x.name),
    },
  };
}

export default Signup;
