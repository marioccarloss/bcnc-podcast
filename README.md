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

## 📝 Convenciones de Código

- **Nomenclatura de archivos**: kebab-case (`podcast-card.tsx`)
- **CSS**: Metodología BEM (`.podcast-card__title`)
- **TypeScript**: Tipado completo en toda la aplicación
- **Componentes**: Funcionales con hooks
- **Imports**: Alias `@/` para rutas absolutas

## 🧪 Testing

Los tests verifican:

- Compilación sin errores (`npm run build`)
- Linter sin warnings (`npm run lint`)
- Funcionalidad de componentes

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

## 📄 Licencia

MIT
