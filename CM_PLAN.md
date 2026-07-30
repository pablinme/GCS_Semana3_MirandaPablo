#CM PLAN

| EC | Ubicación | Por qué es EC? | Quién lo modifica |
| -- | --------- | -------------- | ----------------- |
| SRS_v1 | /docs/SRS | define los requisitos  |  PO |
| config.example | /config | parametriza el sistema  | DevOps  |
| tests   | /tests | valida calidad del sistema  | QA  |
| mod_2FA | /src/auth/modules | define módulo de autenticación doble factor | Dev  |
| config.gateway | /config | controla las rutas de servicios | Dev  |
| schema_v2.sql | /db/migrations/ | estructura de tablas financieras | DBA  |
| trans_v1 | /src/core | define transferencias interbancarias | Dev  |
| config.limits | /config | controla los limites para transferencias | Operaciones  |