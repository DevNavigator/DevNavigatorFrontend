# **Documentación del Proyecto Frontend DevNavigator 🌐💻**
## **Descripción del Proyecto 🤓**
El frontend de DevNavigator está diseñado para proporcionar una experiencia interactiva en el aprendizaje en línea. Este proyecto permite a los usuarios acceder a cursos, ver videos educativos, responder cuestionarios y seguir su progreso. Utiliza React con Next.js, lo que permite una experiencia rápida y dinámica.
## **Instalaciones Necesarias 🛠️**
Antes de comenzar, asegúrate de tener las siguientes herramientas instaladas:
- **Node.js**: [Descargar Node.js](https://nodejs.org/)
- **Yarn** (opcional, pero recomendado): [Descargar Yarn](https://classic.yarnpkg.com/en/docs/install/)
- **Editor de código** (Visual Studio Code recomendado): [Descargar Visual Studio Code](https://code.visualstudio.com/)
### **Dependencias del Proyecto:**
1. **React**: `npm install react react-dom`
2. **Next.js**: `npm install next`
3. **Tailwind CSS** (para estilos): 
    ```bash
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init
    ```
4. **Axios** (para manejar peticiones HTTP): `npm install axios`
5. **Otros paquetes útiles**:
    ```bash
    npm install react-icons react-router-dom
    ```
## **Configuración del Proyecto ⚙️**
### **Pasos para empezar:**
1. **Clona el repositorio:**
    ```bash
    git clone https://github.com/DevNavigator/DevNavigatorFrontend.git
    ```
2. **Instala las dependencias:**
    ```bash
    npm install
    ```
3. **Configuración de variables de entorno (si es necesario):**
    Crea un archivo `.env.local` en la raíz del proyecto y configura las variables necesarias, como las URLs de la API backend y otras configuraciones personalizadas:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3001
    ```
4. **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    El frontend estará disponible en [http://localhost:3000](http://localhost:3000).
## **Estructura de Archivos del Proyecto 📁**
La estructura básica de carpetas del proyecto es la siguiente:
/devnavigator-frontend /components # Componentes reutilizables /pages # Páginas de la aplicación /public # Archivos estáticos (imágenes, etc.) /styles # Estilos globales /utils # Funciones auxiliares .env.local # Variables de entorno package.json # Dependencias y scripts tailwind.config.js # Configuración de Tailwind CSS
## **Funcionalidades del Frontend 👾**
El frontend de DevNavigator está construido con las siguientes funcionalidades clave:
- **Visualización de cursos**: Los usuarios pueden ver los cursos disponibles con una lista de videos, sus títulos y descripciones.
- **Reproductor de video**: Cada curso contiene videos que los usuarios pueden reproducir. El video se marca como completado cuando el usuario lo termina de ver.
- **Cuestionarios**: Al finalizar todos los videos de un curso, los usuarios pueden ver un cuestionario con preguntas relacionadas. Las respuestas se validan y se muestran los resultados.
- **Autenticación**: El sistema permite autenticar a los usuarios para acceder a los contenidos de los cursos.
- **Interactividad**: El diseño es completamente interactivo, con una interfaz limpia y moderna, gestionada por React y Next.js.
## **Componentes Principales del Proyecto 🔧**
### **StudyPage (Página de Estudio)**
El componente `StudyPage` es el corazón del proyecto. Este es responsable de manejar el flujo de aprendizaje, incluyendo:
- **Carga de contenido del curso**: Se hace mediante una llamada API para obtener la información del curso, incluyendo videos y preguntas.
- **Reproducción de videos**: Los usuarios pueden ver videos de un curso y marcar su finalización al terminar cada video.
- **Mostrar cuestionarios**: Una vez que todos los videos son vistos, se habilita un botón para ver el cuestionario.
- **Envío de respuestas y resultados**: Después de responder el cuestionario, se muestran los resultados indicando las respuestas correctas e incorrectas.
### **Interacción con la API Backend**
El frontend interactúa con el backend mediante las siguientes rutas principales:
- **GET /courses/{id}**: Obtiene la información de un curso en base a su ID.
- **POST /quiz/{id}/submit**: Envía las respuestas del cuestionario completado para ser evaluado.
### **Estado del Proyecto**
El estado del curso y las respuestas del usuario se gestionan mediante el estado local en React (`useState`) y los efectos (`useEffect`).
## **Flujo de Trabajo 📈**
1. El usuario accede a la página de un curso.
2. Se carga el contenido del curso desde el backend (videos y preguntas).
3. El usuario visualiza los videos del curso. Cuando termina de ver un video, se marca como completado.
4. Una vez que todos los videos han sido completados, se habilita el cuestionario.
5. El usuario responde las preguntas y envía el cuestionario.
6. Se muestran los resultados del cuestionario.
## **Estilos y Diseño 🎨**
Se utiliza **Tailwind CSS** para la creación de una interfaz de usuario moderna y adaptable. Algunas características clave del diseño son:
- **Responsividad**: El diseño se adapta a diferentes tamaños de pantalla, desde dispositivos móviles hasta escritorios grandes.
- **Interactividad**: Los elementos interactivos (botones, enlaces) tienen transiciones suaves que mejoran la experiencia del usuario.
- **Colores**: Se utiliza una paleta de colores clara y amigable, con énfasis en los tonos de azul para resaltar interacciones.
## **Integrantes del Equipo Frontend 👥**
| **Integrante**                         | **Rol**          |
|----------------------------------------|------------------|
|Carlos Damian Garay                           | Frontend Developer |
|German Manuel Gonzalez                        | Frontend Developer |
|Thomas Vieira Duarte Dantas                   | Frontend Developer |    |