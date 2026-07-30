#Lifecycle Impact

| Fase | Qué cambia? | EC afectados | Riesgo si no se controla | Evidencia de validación |
| ---- | ----------- | ------------ | ------------------------ | ----------------------- |
| Implementación | Agregar modulo de autenticación | biometric.module | el cliente puede no configurar una protección adicional para su cuenta  | Captura  + revision |
| Pruebas   | Agregar prueba de carga de la aplicación| /tests | la aplicación puede tomar mas tiempo del necesario y suficiente para cargar | Captura de ejecución y registro del tiempo |