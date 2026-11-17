
'use client';

import { useState } from 'react';
import { createClient } from '../lib/supClient';

export default function Contactopage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [enviando, setEnviando] = useState(false);
    const [estado, setEstado] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setEstado('');
        setEnviando(true);

        try {
            const supabase = createClient();

            const { error } = await supabase
                .from('mensajes_contacto')
                .insert({
                    nombre: name.trim(),
                    correo: email.trim(),
                    mensaje: message.trim()
                });

            if (error) {
                console.error('Error de Supabase:', error.message);
                throw new Error('No se pudo guardar tu mensaje.');
            }

            setEstado('¡Tu mensaje se envió correctamente!');

            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            setEstado(
                error.message || 'Ocurrió un error al enviar tu mensaje.'
            );
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="p-8 mt-8 max-w-lg mx-auto">
            <h1 className="text-4xl text-gray-800 sm:text-4xl font-bold mb-4">
                Formulario de contacto
            </h1>

            <form onSubmit={handleSubmit}>
                <div className="p-2 w-full">
                    <div className="relative">
                        <label
                            htmlFor="name"
                            className="leading-7 py-4 text-lg text-gray-900"
                        >
                            Nombre
                        </label>

                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            maxLength={100}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>

                <div className="p-2 w-full">
                    <div className="relative">
                        <label
                            htmlFor="email"
                            className="leading-7 py-4 text-lg text-gray-900"
                        >
                            Correo
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            maxLength={254}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-900 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>

                <div className="p-2 w-full">
                    <div className="relative">
                        <label
                            htmlFor="message"
                            className="leading-7 py-4 text-lg text-gray-900"
                        >
                            Mensaje
                        </label>

                        <textarea
                            id="message"
                            name="message"
                            required
                            maxLength={5000}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-white rounded border border-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-900 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                        />
                    </div>
                </div>

                <div className="p-2 w-full">
                    <button
                        type="submit"
                        disabled={enviando}
                        className="flex text-white bg-gray-900 border-0 py-3 px-6 focus:outline-none hover:bg-blue-900 rounded text-xl font-bold shadow-lg mx-0 flex-col text-center disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {enviando ? 'Enviando...' : 'Enviar'}
                    </button>
                </div>

                {estado && (
                    <p
                        role="status"
                        aria-live="polite"
                        className="p-2 mt-2 text-sm text-gray-900"
                    >
                        {estado}
                    </p>
                )}
            </form>
        </div>
    );
}
