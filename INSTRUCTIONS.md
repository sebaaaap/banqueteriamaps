# Instrucciones para la Web de Banquetería MAPS

He creado la carpeta `ui` con el proyecto Next.js configurado. Aquí tienes los pasos para ejecutarlo:

## 1. Instalación y Ejecución

Ya he instalado las dependencias necesarias (`lucide-react`, `next-sanity`, etc.).

Para iniciar el servidor de desarrollo:

```bash
cd ui
npm run dev
```

La web estará disponible en [http://localhost:3000](http://localhost:3000).

## 2. Configuración de Sanity

El cliente de Sanity está configurado en `lib/sanity.ts` con el Project ID: `5qt9gshl` y Dataset: `production`.

### Schemas Requeridos
La página web espera los siguientes tipos de documentos en tu Sanity Studio (`studio-banqueteriamaps`):

1. **Servicio** (`servicio`):
   - `titulo` (string)
   - `descripcion` (text)
   - `imagenPrincipal` (image)
   - `pdfMenu` (file)

2. **Evento** (`evento`):
   - *Nota: El archivo de esquema actual parecía vacío. Asegúrate de definir:*
   - `titulo` (string)
   - `imagen` (image)

3. **Configuración Global** (`configuracion`):
   - `whatsapp` (string, ej: "+56912345678")
   - `instagram` (url)
   - `email` (string)

## 3. Estructura del Proyecto

- **`app/page.tsx`**: Página principal con Hero, Servicios, Eventos y Contacto.
- **`app/layout.tsx`**: Layout global con fuentes (Playfair Display, Inter) y estructuras base.
- **`components/Navbar.tsx`**: Barra de navegación responsive y transparente.
- **`components/Footer.tsx`**: Pie de página con enlaces y redes sociales.
- **`app/globals.css`**: Variables de estilo y configuración de colores corporativos (Rosa #E91E63, etc.) usando Tailwind v4.

## 4. Personalización

Puedes ajustar los colores y fuentes en `app/globals.css`.
El contenido estático (textos del Hero) se puede editar directamente en `app/page.tsx` o mover a Sanity si prefieres hacerlo dinámico.
