import ConfigSetter from "@/components/ConfigSetter";
import ProductsGrid from "@/components/productos/ProductsGrid";
import { client } from "@/lib/sanity";

interface Producto {
    _id: string;
    titulo: string;
    descripcion: string;
    imagenPrincipal: any;
    categoria: string;
}

interface Configuracion {
    whatsapp: string;
    email: string;
    instagram: string;
}

// Data fetching
async function getData() {
    // Fetch ALL productos
    const productsQuery = `*[_type == "producto"] | order(titulo asc){
    _id,
    titulo,
    descripcion,
    imagenPrincipal,
    categoria
  }`;

    const configQuery = `*[_type == "configuracion"][0]`;

    try {
        const [products, config] = await Promise.all([
            client.fetch<Producto[]>(productsQuery),
            client.fetch<Configuracion>(configQuery).catch(() => ({ whatsapp: "56976324033", email: "", instagram: "" })),
        ]);
        return { products, config };
    } catch (error) {
        console.error("Error fetching data:", error);
        return { products: [], config: null };
    }
}

export default async function ProductosPage() {
    const { products, config } = await getData();

    const dummyProducts = [
        {
            _id: 'dummy1',
            titulo: 'Cóctel Salado Premium',
            descripcion: 'Selección de 50 bocados gourmet fríos y calientes preparados con ingredientes de estación.',
            imagenPrincipal: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800&auto=format&fit=crop',
            categoria: 'salado'
        },
        {
            _id: 'dummy2',
            titulo: 'Mini Gourmet Burgers',
            descripcion: 'Mini hamburguesas artesanales con cebolla caramelizada, queso fundido y salsa secreta MAPS.',
            imagenPrincipal: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop',
            categoria: 'salado'
        },
        {
            _id: 'dummy3',
            titulo: 'Tabla Mar y Tierra',
            descripcion: 'Quesos maduros, jamón serrano premium y nuestro clásico ceviche de reineta en formato shot.',
            imagenPrincipal: '/b6.png',
            categoria: 'tablas'
        },
        {
            _id: 'dummy4',
            titulo: 'Cóctel Dulce',
            descripcion: 'Exquisita variedad de bocados dulces y postres en formato mini para cerrar con broche de oro.',
            imagenPrincipal: '/b5.png',
            categoria: 'dulce'
        }
    ];

    const displayProducts = products && products.length > 0 ? products : dummyProducts;

    return (
        <div className="flex flex-col min-h-screen bg-brand-white">
            {config && <ConfigSetter whatsapp={config.whatsapp} />}

            {/* Mini Hero Section */}
            <section className="relative h-[30vh] flex items-center justify-center overflow-hidden bg-brand-black pt-20">
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div className="absolute inset-0 z-0 opacity-40" style={{ backgroundImage: "url('/b6.png')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="relative z-20 text-center px-4">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4 uppercase tracking-widest">
                        Catálogo de Productos
                    </h1>
                    <div className="w-16 h-1 bg-brand-pink mx-auto"></div>
                </div>
            </section>

            {/* Main Grid Component (Client-side) */}
            <ProductsGrid products={displayProducts} />
        </div>
    );
}
