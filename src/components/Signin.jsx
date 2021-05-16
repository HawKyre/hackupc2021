import FormInput from "./FormInput";

export default function Signin({
  handleChange,
  loginForm,
  signupError,
  signIn,
}) {
  return (
    <div className="font-sans absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
      <div className="">
        <p className="mb-3">Nombre de usuario</p>
        <FormInput
          name="username"
          value={loginForm.username}
          type="email"
          placeholder="hackupc2021"
          onChange={handleChange}
        />
      </div>
      <div className="">
        <p className="mb-3">Contraseña</p>
        <FormInput
          name="password"
          value={loginForm.password}
          type="password"
          placeholder="1234seguro"
          onChange={handleChange}
        />
      </div>
      <p>{Boolean(signupError) && signupError}</p>
      <button
        onClick={signIn}
        disabled={!loginForm.username || !loginForm.password}
        className={`mt-8 text-3xl ${
          (!loginForm.username || !loginForm.password) && "text-gray-200"
        }`}
      >
        Entrar
      </button>
    </div>
  );
}
