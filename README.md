# Solar Business

# Documentación del Proyecto Solar Business

## 1. **Arquitectura del Proyecto**

### 1.1 **Descripción General**
El proyecto Solar Business es una aplicación web diseñada para gestionar datos relacionados con usuarios, reportes y mantenimiento de sistemas solares. La arquitectura está dividida en tres capas principales:

1. **Frontend**: Una colección de páginas HTML estáticas que proporcionan la interfaz de usuario.
2. **Backend**: Una API RESTful construida con Node.js y Express que maneja la lógica del negocio y la interacción con la base de datos.
3. **Base de Datos**: Una base de datos SQLite gestionada a través de Sequelize ORM.

---

### 1.2 **Estructura del Proyecto**
El proyecto está organizado en las siguientes carpetas principales:

- **Front/**: Contiene las páginas HTML estáticas que forman la interfaz de usuario.
- **Back/**: Contiene el servidor backend, configuraciones, controladores, middleware, modelos y rutas.
- **Cloudformation/**: Archivos YAML para la infraestructura como código (IaC).
- **DB/**: Espacio reservado para archivos relacionados con la base de datos.

---

### 1.3 **Frontend**
El frontend utiliza HTML estático con soporte para Tailwind CSS y Feather Icons. Las páginas están diseñadas para ser ligeras y fáciles de navegar. Algunas páginas clave incluyen:

- `index.html`: Página de inicio.
- `login.html`: Página de inicio de sesión.
- `documents.html`: Página para gestionar documentos, como el manual de usuario.
- `maintenance.html`: Página para calcular y mostrar fechas de mantenimiento.
- `monitoring.html`, `statistics.html`, `payments.html`: Páginas adicionales para monitoreo, estadísticas y pagos.

---

### 1.4 **Backend**
El backend está construido con Node.js y Express. Las principales responsabilidades incluyen:

- **Gestión de usuarios**: Registro, autenticación y autorización.
- **Gestión de reportes**: Creación y consulta de reportes.
- **Sincronización de la base de datos**: Uso de Sequelize para manejar el esquema de la base de datos.

#### Estructura del Backend:
- **`src/app.js`**: Configura middlewares y rutas.
- **`src/index.js`**: Punto de entrada del servidor.
- **`src/controllers/`**: Contiene la lógica de negocio para usuarios, reportes y autenticación.
- **`src/models/`**: Define los modelos Sequelize para interactuar con la base de datos.
- **`src/routes/`**: Define las rutas de la API.
- **`src/middleware/`**: Contiene middlewares personalizados como autenticación y manejo de errores.

---

### 1.5 **Base de Datos**
La base de datos utiliza SQLite, gestionada a través de Sequelize ORM. Los modelos principales incluyen:

- **User**: Representa a los usuarios del sistema.
  - Campos: `id`, `name`, `email`, `password`, `role`, `installationDate`, `lastMaintenance`.
- **Report**: Representa reportes generados por los usuarios.

---

### 1.6 **Infraestructura**
La carpeta Cloudformation contiene archivos YAML para definir la infraestructura como código. Esto incluye configuraciones para la aplicación y la base de datos.

---

## 2. **Posibles Fallas y Troubleshooting**

### 2.1 **Errores Comunes**
#### 2.1.1 **Problemas de Conexión a la Base de Datos**
- **Síntoma**: El servidor no puede conectarse a la base de datos.
- **Causa**: Archivo SQLite faltante o permisos incorrectos.
- **Solución**:
  1. Verifica que el archivo de la base de datos existe en la ubicación esperada.
  2. Asegúrate de que el servidor tiene permisos de lectura/escritura.

#### 2.1.2 **Errores de Sincronización de Sequelize**
- **Síntoma**: Sequelize lanza errores al intentar sincronizar el esquema.
- **Causa**: Cambios en los modelos que no coinciden con la base de datos.
- **Solución**:
  1. Asegúrate de que `sequelize.sync({ alter: true })` está configurado correctamente en `src/index.js`.
  2. Si el problema persiste, elimina la base de datos y permite que Sequelize la regenere.

#### 2.1.3 **Problemas de Autenticación**
- **Síntoma**: Los usuarios no pueden iniciar sesión.
- **Causa**: Tokens JWT expirados o credenciales incorrectas.
- **Solución**:
  1. Verifica que el token JWT no ha expirado.
  2. Asegúrate de que las credenciales son correctas.

---

### 2.2 **Errores en el Frontend**
#### 2.2.1 **Problemas de Carga de Páginas**
- **Síntoma**: Las páginas HTML no se cargan correctamente.
- **Causa**: Archivos faltantes o rutas incorrectas.
- **Solución**:
  1. Verifica que los archivos HTML están en la carpeta Front.
  2. Asegúrate de que las rutas en el navegador son correctas.

#### 2.2.2 **Problemas de Estilo**
- **Síntoma**: Las páginas no se ven como se espera.
- **Causa**: Archivos CSS faltantes o mal referenciados.
- **Solución**:
  1. Verifica que Tailwind CSS está correctamente referenciado en las páginas.
  2. Asegúrate de que los archivos CSS están en la ubicación correcta.

---

### 2.3 **Errores en el Backend**
#### 2.3.1 **Rutas No Encontradas**
- **Síntoma**: El servidor responde con un error 404.
- **Causa**: Rutas mal definidas o no registradas.
- **Solución**:
  1. Verifica que las rutas están correctamente definidas en `src/routes/`.
  2. Asegúrate de que las rutas están registradas en `src/app.js`.

#### 2.3.2 **Errores de Middleware**
- **Síntoma**: El servidor lanza errores relacionados con middlewares.
- **Causa**: Middlewares mal configurados.
- **Solución**:
  1. Verifica la configuración de middlewares en `src/app.js`.
  2. Asegúrate de que los middlewares están correctamente implementados en `src/middleware/`.

---

## 3. **Mejores Prácticas**

1. **Gestión de Dependencias**:
   - Usa `npm install` para instalar dependencias.
   - Mantén las dependencias actualizadas.

2. **Manejo de Errores**:
   - Implementa un middleware global para manejar errores en `src/middleware/errorHandler.js`.

3. **Seguridad**:
   - Usa variables de entorno para almacenar secretos como claves JWT.
   - Asegúrate de que las contraseñas están encriptadas antes de almacenarlas.

4. **Documentación**:
   - Mantén actualizada la documentación en README.md.
   - Documenta las rutas de la API y los modelos.

5. **Pruebas**:
   - Implementa pruebas unitarias y de integración para garantizar la calidad del código.

---

## 4. **Futuras Mejoras**

1. **Subida de Archivos**:
   - Implementar un sistema para subir y gestionar documentos en el backend.
   - Usar una biblioteca como `multer` para manejar archivos.

2. **Autenticación Avanzada**:
   - Implementar autenticación basada en roles para mayor seguridad.

3. **Optimización del Frontend**:
   - Migrar a un framework como React o Vue.js para mejorar la experiencia del usuario.

4. **Escalabilidad**:
   - Migrar la base de datos a un sistema más robusto como PostgreSQL o MySQL.
