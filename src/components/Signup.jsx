/* eslint-disable max-lines-per-function */
import FormInput from "./FormInput";
import { useState } from "react";

export default function Signup({
  handleChange,
  registerForm,
  signupError,
  signUp,
  uniList,
}) {
  const [uniFilter, setUniFilter] = useState("");
  return (
    <div className="font-sans mt-20 flex flex-col items-center justify-center">
      <div className="">
        <p className="mb-3">Correo electrónico</p>
        <FormInput
          name="email"
          value={registerForm.email}
          type="email"
          placeholder="Correo..."
          onChange={handleChange}
        />
      </div>
      <div className="">
        <p className="mb-3">Nombre de usuario</p>
        <FormInput
          name="username"
          value={registerForm.username}
          type="email"
          placeholder="Correo..."
          onChange={handleChange}
        />
      </div>
      <div className="">
        <p className="mb-3">Contraseña</p>
        <FormInput
          name="password"
          value={registerForm.password}
          type="password"
          placeholder="Contraseña..."
          onChange={handleChange}
        />
      </div>
      <p className="mb-3 mt-6">Universidad</p>
      <FormInput
        name="university-field"
        type="text"
        placeholder="Universidad..."
        onChange={(ev) => {
          setUniFilter(ev.target.value);
        }}
        className="mb-2"
        value={uniFilter}
      />
      <select
        name="universityID"
        value={registerForm.university}
        onChange={handleChange}
        className="w-60 mb-9 bg-gray-100 px-2 py-1 rounded filter drop-shadow"
      >
        {uniList
          .filter((uni) =>
            uni.name.toLowerCase().startsWith(uniFilter.toLowerCase())
          )
          .map((uni) => {
            return (
              <option key={uni.id} value={uni.id}>
                {uni.name}
              </option>
            );
          })}
      </select>
      <p>{Boolean(signupError) && signupError}</p>
      <button
        onClick={signUp}
        className={`mt-8 text-3xl ${
          (Object.values(registerForm).some((field) => field === "") ||
            uniList.filter((uni) =>
              uni.name.toLowerCase().startsWith(uniFilter.toLowerCase())
            ).length === 0) &&
          "text-gray-200"
        }`}
        disabled={
          Object.values(registerForm).some((field) => field === "") ||
          uniList.filter((uni) =>
            uni.name.toLowerCase().startsWith(uniFilter.toLowerCase())
          ).length === 0
        }
      >
        Crear cuenta
      </button>
    </div>
  );
}
