# Reto Técnico Back End
Aplicación de agendamiento de cita médica para asegurados

## Descripción de Negocio
Un asegurado desea agendar una cita médica, ingresa a la aplicación y escoge el centro médico, la especialidad, el médico y la fecha y hora de un listado que muestra la aplicación web. Luego presiona un botón “Agendar” y los datos son enviados a una aplicación backend que le devuelve un mensaje diciéndole que el agendamiento está en proceso. Esta aplicación funciona tanto para Perú como Chile. El procesamiento de agendamiento es distinto por país.

---

## Tecnologías

- Node.js + TypeScript
- Serverless Framework
- AWS Lambda, DynamoDB, SNS, SQS, EventBridge
- Jest (pruebas unitarias)
- Swagger/OpenAPI

---

## Instalación

```bash
npm install
```

---

##  Estructura del Proyecto

```bash
.
├── src/
│   ├── __tests__/               # Pruebas unitarias
│   ├── infra/      # Acceso a servicios externos (Dynamo, RDS, SQS)
│   ├── interfaces/
│   │   └── api/             # Lambdas expuestas como endpoints
│   └── handler.ts           # Exporta todos los handlers
├── serverless.yml           # Infraestructura
├── tsconfig.json            # Configuración TypeScript
└── docs/
    └── openapi.yaml         # Documentación OpenAPI
```


## Desarrollo

### DynamoDB local + Offline

```bash
npm run offline
```

### Tests

```bash
npm test
```


## Autor

Germán D. De la Cruz
```
📧 german.pedro.delacruz@gmail.com
```