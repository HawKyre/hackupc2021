import { useEffect, useState } from "react";
import Head from "next/Head";

export default function Home() {
    return (
        <div className="font-sans h-screen flex flex-col items-center justify-center bg-blue-100">
            <h1 className="text-3xl">Name</h1>
            <div className="grid grid-cols-2 grid-rows-4 gap-6 bg-blue-300 border-blue-800 m-4 p-2 rounded text-2xl">
                <div>Usuario</div>
                <input type="text" />
                <div>Email</div>
                <input type="text" />
                <div>Contraseña</div>
                <input type="text" />
                <button className="justify-center col-span-2 rounded bg-blue-500">
                    Registrase
                </button>
            </div>
        </div>
    );
}
