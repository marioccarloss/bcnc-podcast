# Podcast App - Next.js

Aplicación de podcasts desarrollada con Next.js 16, TypeScript y arquitectura hexagonal.

## 🏗️ Arquitectura

Este proyecto implementa **Arquitectura Hexagonal** (Ports & Adapters) con separación clara de responsabilidades:

```
src/
├── domain/              # Capa de Dominio
│   ├── models/         # Entidades de negocio (Podcast, Episode)
│   └── repositories/   # Interfaces de repositorios (ports)
├── application/        # Capa de Aplicación
│   └── use-cases/     # Casos de uso del negocio
└── infrastructure/     # Capa de Infraestructura
    ├── api/           # Implementaciones de repositorios (adapters)
    └── ui/            # Componentes de interfaz de usuario
        ├── components/
        ├── styles/
        └── ...
```

### Principios de Diseño

- **Domain-Driven Design (DDD)**: El dominio es el núcleo de la aplicación
- **Dependency Inversion**: Las capas externas dependen de las internas
- **Single Responsibility**: Cada capa tiene una única responsabilidad

## 🧩 Estrategia de Componentización

La organización de componentes UI sigue un **enfoque híbrido Domain-Driven + UI Primitives**, alineado con la arquitectura hexagonal:

```
src/infrastructure/ui/components/
├── common/              # Componentes compartidos globales
│   ├── header.tsx      # Navegación principal
│   └── header.css
├── primitives/          # Componentes UI reutilizables (futuros)
│   └── (button, input, card, etc.)
├── podcast/             # Componentes del dominio Podcast
│   ├── podcast-card.tsx
│   ├── podcast-detail-sidebar.tsx
│   ├── podcast-list-view.tsx
│   ├── search-filter.tsx
│   └── *.css
└── episode/             # Componentes del dominio Episode
    ├── episode-list.tsx
    ├── episode-player.tsx
    └── *.css
```

### ¿Por qué esta organización?

1. **Alineación con Hexagonal Architecture**: Los componentes siguen la misma lógica de dominio que las capas internas
2. **Escalabilidad**: Fácil agregar nuevos dominios (User, Playlist, etc.)
3. **Cohesión**: Componentes relacionados están juntos
4. **Evita sobre-ingeniería**: Más simple que Atomic Design para este tamaño de proyecto
5. **Reutilización**: La carpeta `primitives/` permite componentes UI base cuando sea necesario

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: CSS puro con metodología BEM
- **Estilos**: CSS puro con metodología BEM
- **Caché**: Implementación nativa con `use cache` y `fetch` (revalidate: 24h)
- **Naming**: kebab-case para archivos y carpetas

## ⚙️ Configuración

Crea un archivo `.env` o `.env.local` en la raíz del proyecto:

```bash
ITUNES_API_URL=https://itunes.apple.com
```

## ⚡ Estrategia de Caché (Eficiencia y Performance)

Para cumplir con el requisito de eficiencia y evitar llamadas redundantes a la API (funcionalidad típicamente resuelta por librerías como `react-query`), hemos implementado una **estrategia de caché multicapa** nativa de Next.js 16:

### 1. Request Memoization (Deduplicación)

- **Objetivo**: Evitar que el mismo endpoint se llame múltiples veces durante el renderizado de una sola página (ej: Header y Page pidiendo los mismos datos).
- **Implementación**: Next.js automáticamente "recuerda" las peticiones `fetch` idénticas dentro del mismo ciclo de request/response.

### 2. Data Cache (Persistencia de API)

- **Objetivo**: Evitar golpear la API de iTunes en cada visita de usuario.
- **Implementación**: `fetch(url, { next: { revalidate: 86400 } })`.
- **Resultado**: La respuesta cruda de iTunes se almacena en el servidor por **24 horas**.

### 3. `'use cache'` (Caché de Computación)

- **Objetivo**: Ahorrar el coste de procesar (parsear JSON, mapear a dominio) los datos repetidamente.
- **Implementación**: Directiva experimental de Next.js 16 en el repositorio.
- **Resultado**: Se cachea el **objeto de dominio final**. Si la caché de Data Cache sigue válida, esta capa evita incluso tener que leer y parsear esa respuesta.

### 4. Router Cache (Cliente)

- **Objetivo**: Navegación instantánea tipo "SPA" sin refetching al volver atrás.
- **Implementación**: Automática en Next.js App Router.
- **Resultado**: Al navegar entre rutas visitadas, los datos se sirven de la memoria del navegador.

### Resumen de Mejoras

Esta arquitectura elimina la necesidad de `react-query` o `SWR`, reduciendo el tamaño del bundle del cliente y moviendo la complejidad de la gestión de estado al servidor, donde es más eficiente.

## 🚀 Comandos

```bash
# Desarrollo
npm run dev

# Build de producción
npm run build

# Linter
npm run lint

# Iniciar producción
npm start
```

## 🔄 CI/CD con GitHub Actions + Vercel

La ruta `.github/workflows/ci.yml` define una pipeline automática que valida cada cambio y despliega en Vercel cuando corresponde.

### Cómo funciona
1. **`quality` job** (push y PR contra `main`): instala dependencias con `npm ci`, ejecuta `npm run lint`, `npm run test -- --run` y `npm run build`. Si algo falla se bloquea el merge/deploy.
2. **`deploy` job** (solo push a `main`): reutiliza el código validado, ejecuta `vercel pull/build/deploy` y publica en producción usando la CLI oficial (`npx vercel deploy --prebuilt --prod`).

### Secretos requeridos en GitHub
1. **`VERCEL_TOKEN`**: generar en `https://vercel.com/account/tokens`.
2. **`VERCEL_ORG_ID`** y **`VERCEL_PROJECT_ID`**: ejecutar localmente `npx vercel link` en este repo o abrir el archivo `.vercel/project.json` resultante para copiar `orgId` y `projectId`.
3. Añadirlos en `Settings > Secrets and variables > Actions` del repo.

Con esos secretos configurados la pipeline desplegará automáticamente cada push en `main`. Los Pull Requests seguirán ejecutando solo validaciones, por lo que se puede iterar con confianza antes de publicar.

## 📝 Convenciones de Código

- **Nomenclatura de archivos**: kebab-case (`podcast-card.tsx`)
- **CSS**: Metodología BEM (`.podcast-card__title`)
- **TypeScript**: Tipado completo en toda la aplicación
- **Componentes**: Funcionales con hooks
- **Imports**: Alias `@/` para rutas absolutas

## 🧪 Testing

El proyecto utiliza **Vitest** con entorno `jsdom` y `@testing-library/react` para asegurar la calidad tanto de los adaptadores de infraestructura como de la UI.

- **Cobertura crítica**: los puertos HTTP se validan con pruebas unitarias que mockean `fetch` usando `vi.fn`, garantizando URLs correctas, caching (`revalidate: 86400`) y parsing hacia el dominio (`src/infrastructure/api/itunes-repository-impl.test.ts`).
- **Testing Library listo**: los componentes React se testean con `@testing-library/react` cuando aplica, enfocándose en comportamiento observable y accesibilidad.
- **Coverage y CI**: el comando `bun test --coverage` habilita `@vitest/coverage-v8`; la suite se ejecuta en cada push antes del build para asegurar regresiones cero.

Comandos clave:

```bash
# Ejecutar suite completa
bun test

# Con cobertura
bun test --coverage
```

## 📚 Storybook

Para documentar y validar visualmente los componentes reutilizables, Storybook 10 está configurado con el builder `@storybook/nextjs-vite` y addons de accesibilidad, docs automáticos y compatibilidad con Vitest.

- **Catálogo de primitivas**: comenzando por `Text`, cada componente en `src/infrastructure/ui/components/primitives` expone historias con `tags: ['autodocs']` para generar documentación viva y controles de props (`as`, `variant`, `children`, etc.).
- **Pruebas visuales locales**: `bun run storybook` levanta el entorno interactivo en el puerto 6006 para revisar estados, contrastes y variantes sin necesidad de la app completa.
- **Build estático**: `bun run build-storybook` genera artefactos deployables, listos para compartir en plataformas como Chromatic o un bucket estático.

Esta configuración permite incorporar revisiones de diseño, testear edge cases visuales y detectar regresiones en los componentes antes de integrarlos en la App Router.

## 🔍 Limpieza del buscador

El buscador de podcasts debía mantener una UX coherente: si el usuario filtra en `/` y navega a un detalle, al volver debe ver la lista completa (no un filtro residual). Para lograrlo sin dependencias globales se implementó un pequeño bus de eventos y un hook dedicado.

- **Evento controlado**: `useResetSearch` (`src/infrastructure/ui/hooks/use-reset-search.ts`) expone una función que dispara `podcast-search-reset` en `window`. Esto evita acoplar los componentes de navegación con el estado del input.
- **Escucha desacoplada**: `usePodcastFilter` suscribe ese evento y limpia el estado local `filter`, además de controlar el enfoque del input via `searchInputRef`. Con esto cualquier reset afecta inmediatamente al contador y a la grilla filtrada.
- **Integración en la navegación**: `AppLink` detecta cuándo se abandona la ruta `/` y dispara `resetSearch()` antes de iniciar una nueva navegación (`useNavigation`). Los tests (`app-link.test.tsx`) cubren los casos: salir de home limpia, navegar dentro de detalle no altera la búsqueda, y navegar al mismo destino no hace nada.

El resultado es un buscador totalmente controlado desde la capa de infraestructura UI, sin depender del router ni del estado global de Next.js, manteniendo la experiencia consistente y testeada.

## 📦 Estructura de Datos

### Podcast

```typescript
{
  id: string;
  title: string;
  author: string;
  image: string;
  summary: string;
}
```

### Episode

```typescript
{
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  date: string;
  duration: string;
}
```

## 🎯 Decisiones de Diseño

### ¿Por qué Hexagonal Architecture?

- Facilita testing (mockear repositorios)
- Independencia de frameworks externos
- Cambiar APIs sin afectar el dominio

### ¿Por qué Domain-Driven Components?

- Mejor que Atomic Design para proyectos con dominios claros
- Componentes organizados por contexto de negocio
- Fácil localizar y mantener código relacionado

### ¿Por qué CSS puro con BEM?

- Control total sobre estilos
- Sin dependencias externas
- Demuestra dominio de CSS
- Metodología escalable y mantenible

### Ventajas del CSS descentralizado

- **Encapsulamiento por dominio**: cada componente mantiene su `.css` junto al `.tsx`, lo que reduce el contexto necesario para editar estilos y evita colisiones globales.
- **Optimizaciones de build**: al no tener un `globals.css` gigantesco, Next.js tree-shakea imports, cargando solo los estilos usados por cada ruta (mejor TTFB y menor CSS crítico).
- **Escalabilidad natural**: nuevas vistas (ej. `episode/*`) agregan sus estilos sin tocar archivos compartidos; el versionado en PRs refleja claramente qué pieza UI cambió.
- **DX consistente**: la combinación de BEM + archivos locales hace triviales los refactors, ya que los selectores `block__element--modifier` viven en su propio contexto y no dependen de cascadas complejas.

## 📄 Licencia

MIT
