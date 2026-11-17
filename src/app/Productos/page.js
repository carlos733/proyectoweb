
import TarjetaProducto from '../Componentes/TarjetaProductos';
import { createClient } from '../lib/supServer';

async function getProductos() {
    const supabase = await createClient();

    const { data: productos, error } = await supabase
        .from('Productos')
        .select('id, Nombre, Descripción, Precio, Imagen');

    if (error) {
        console.error('Error al obtener productos:', error.message);
        return [];
    }

    return productos ?? [];
}

export default async function ProductosPage() {
    const productos = await getProductos();

    return (
        <section>
            <h1 className="titulo-catalogo">Catálogo</h1>

            <div className="catalogo-productos">
                {productos.map((item) => (
                    <TarjetaProducto
                        key={item.id}
                        producto={item}
                    />
                ))}
            </div>
        </section>
    );
}
