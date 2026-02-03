# ✨ EduMagic VE - Organizador Escolar Mágico

EduMagic VE es una aplicación inteligente diseñada para ayudar a los padres y representantes en Venezuela a organizar el calendario escolar de sus hijos. Utilizando la potencia de la Inteligencia Artificial (Gemini API), la app permite extraer automáticamente tareas, exámenes y proyectos a partir de fotos de planeadores o texto escrito.

## 🚀 Características Principales

- **Extracción Mágica**: Sube una foto de la cartelera o el cuaderno y la IA extraerá materias, fechas y porcentajes.
- **Boletín Inteligente**: Visualiza promedios automáticos por materia y lapso (escala 0-20).
- **Consejos de Gemini**: Obtén tips personalizados para estudiar cada tarea específica.
- **Reporte Descargable**: Genera un archivo de texto organizado por fechas para compartir por WhatsApp o imprimir.
- **PWA (Progressive Web App)**: Instálala en tu teléfono para acceso rápido sin internet (modo offline).

## 🛠️ Configuración para Despliegue (Netlify)

Para que la aplicación funcione correctamente, debes configurar la API Key de Google Gemini:

1. Ve a tu panel de **Netlify**.
2. Entra en **Site configuration** > **Environment variables**.
3. Añade una nueva variable:
   - **Key**: `API_KEY`
   - **Value**: `TU_GEMINI_API_KEY_AQUÍ`
4. Despliega la aplicación.

## 📦 Estructura del Proyecto

- `index.html`: Punto de entrada con estilos consolidados y configuración de módulos.
- `index.tsx`: Lógica principal en React.
- `services/`: Lógica de integración con Gemini y almacenamiento local.
- `components/`: Componentes modulares de la interfaz (Dashboard, TaskList, etc.).
- `netlify.toml`: Configuración de construcción para Netlify.

---
Creado con ❤️ para las familias de Venezuela.