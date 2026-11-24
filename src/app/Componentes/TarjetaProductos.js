
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import './tarjetaproducto.css';
import { eliminarProducto } from '../actions/productosAction';


export default function TarjetaProducto({ producto }) {
    const [agregado, setAgregado] = useState(false);
    const [cargando, setCargando] = useState(false);

    const router = useRouter();

    const handleEliminar = async () => {
        const confirmacion = window.confirm(
            `¿Estás seguro de eliminar "${producto.Nombre}"?`
        );

        if (!confirmacion) return;

        setCargando(true);

        try {
            await eliminarProducto(producto.id);

            alert('Producto eliminado correctamente.');

            router.refresh();
        } catch (error) {
            console.error('Error al eliminar:', error);

            alert(
                error.message || 'Ocurrió un error al eliminar el producto.'
            );
        } finally {
            setCargando(false);
        }
    };

    return (
        
        <article className="tarjeta">
            {producto.Imagen && (
                <div className="imagen">
                    <Image
                        src={producto.Imagen}
                        alt={producto.Nombre}
                        width={170}
                        height={200}
                    />
                </div>
            )}

            <h2>{producto.Nombre}</h2>

            <p>{producto.Descripción}</p>

            <p className="precio">
                ${producto.Precio}
            </p>

            <button
                type="button"
                onClick={() => setAgregado(!agregado)}
            >
                {agregado
                    ? 'Quitar del carrito'
                    : 'Agregar al carrito'}
            </button>

            <button
                type="button"
                onClick={handleEliminar}
                disabled={cargando}
                className="btn-eliminar"
            >
                {cargando ? 'Eliminando...' : 'Eliminar producto'}
            </button>
        </article>
    );
}
