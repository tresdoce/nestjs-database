<div align="center">
    <img alt="nestjs-database" width="250" height="auto" src="https://camo.githubusercontent.com/c704e8013883cc3a04c7657e656fe30be5b188145d759a6aaff441658c5ffae0/68747470733a2f2f6e6573746a732e636f6d2f696d672f6c6f676f5f746578742e737667" />
    <h3>NestJS - Mongo Database</h3>
</div>

<p align="center">
    <img src="https://img.shields.io/static/v1.svg?style=flat&label=Node&message=v14.15.4&labelColor=339933&color=757575&logoColor=FFFFFF&logo=Node.js" alt="Node.js"/>
    <img src="https://img.shields.io/static/v1.svg?style=flat&label=Npm&message=v6.14.10&labelColor=CB3837&logoColor=FFFFFF&color=757575&logo=npm" alt="Npm"/>
    <img src="https://img.shields.io/static/v1.svg?style=flat&label=NestJs&message=v8.2.6&labelColor=E0234E&logoColor=FFFFFF&color=757575&logo=Nestjs" alt="NestJs"/>
    <img alt="GitHub license" src="https://img.shields.io/github/license/tresdoce/nestjs-database?style=flat"><br/>
    <img alt="GitHub Workflow Status" src="https://github.com/tresdoce/nestjs-database/actions/workflows/master.yml/badge.svg?branch=master">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/tresdoce/nestjs-database?logoColor=FFFFFF&logo=Codecov&labelColor=#F01F7A">
    <img src="https://sonarcloud.io/api/project_badges/measure?project=tresdoce_nestjs-database&metric=alert_status" alt="sonarcloud">
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/tresdoce/nestjs-database">
    <br/>
</p>

Esta dependencia está pensada para ser utilizada en [NestJs Starter](https://github.com/rudemex/nestjs-starter), o
cualquier proyecto que utilice una configuración centralizada, siguiendo la misma arquitectura del starter.

## Glosario

- [📝 Requerimientos básicos](#basic-requirements)
- [🛠️ Instalar dependencia](#install-dependencie)
- [⚙️ Configuración](#configurations)
- [📤 Commits](#commits)
- [📄 Changelog](./CHANGELOG.md)
- [📜 License MIT](license.md)

---

<a name="basic-requirements"></a>

## 📝 Requerimientos básicos

- [NestJs Starter](https://github.com/rudemex/nestjs-starter)
- Node.js v14.15.4 or higher ([Download](https://nodejs.org/es/download/))
- NPM v6.14.10 or higher
- NestJS v8.2.0 or higher ([Documentación](https://nestjs.com/))

<a name="install-dependencie"></a>

## 🛠️ Instalar dependencia

```
npm install @tresdoce/nestjs-database
```

<a name="configurations"></a>

## ⚙️ Configuración

Agregar los datos de conexión a mongo desde el `configuration.ts` utilizando el key `database` que contenga el objeto `mongo` que obtenga los datos desde las variables de entorno.

```typescript
// ./src/config/configuration.ts
import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    ...
    database: {
      mongo: {
        connection: process.env.MONGO_CONNECTION || 'mongodb',
        user: encodeURIComponent(process.env.MONGO_USER),
        password: encodeURIComponent(process.env.MONGO_PASSWORD),
        host: process.env.MONGO_HOST,
        port: parseInt(process.env.MONGO_PORT, 10),
        dbName: process.env.MONGO_DB_NAME,
      },
    },
    ...
  };
});
```

<details>
<summary>💬 Para ver en detalle todas las propiedades de la configuración, hace click acá.</summary>

`connection`: Es el protocolo de conexión a mongo.

- Type: `String`
- Values: `mongodb | mongodb+srv`

`user`: Es el nombre de usuario para conectarse a la base de datos mongo.

- Type: `String`

`password`: Es la contraseña de usuario para conectarse a la base de datos mongo.

- Type: `String`

`host`: Es el servidor para conectarse a la base de datos mongo.

- Type: `String`
- Values: `localhost | 127.0.0.1 | <host mongo>`

`port`: Es el puerto para conectarse a la base de datos mongo, no es obligatorio ponerlo.

- Type: `Number`
- Default: `27017`

`dbName`: Es el nombre de la base de datos mongo.

- Type: `String`

</details>

Una vez agregada la configuración, solo basta con importar el módulo en el archivo `app.module.ts`, y el módulo se encargará de obtener la configuración automaticamente.

```typescript
// ./src/app.module.ts
import { MongoModule } from '@tresdoce/nestjs-database';

@Module({
    ...
    imports: [
      ...
      MongoModule,
      ...
    ],
    ...
})
export class AppModule {}
```

Para la inyección de `Schemas` se utiliza la propiedad `forFeature` del módulo enviando las `entity` como un array de objetos.

```typescript
import {  Cat, CatSchema  } from './entities/cat.entity';

@module({
  imports:[
    ...
    MongoModule.forFeature([
      {
        name: Cat.name,
        schema: CatSchema
      }
    ])
    ...
  ],
  ...
})
export class CatsModule {}
```

> 💬 Para más información, podés consultar la documentación oficial de NestJs

<a name="commits"></a>

## 📤 Commits

Para los mensajes de commits se toma como
referencia [`conventional commits`](https://www.conventionalcommits.org/en/v1.0.0-beta.4/#summary).

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

- **type:** chore, docs, feat, fix, refactor (más comunes)
- **scope:** indica la página, componente, funcionalidad
- **description:** comienza en minúsculas y no debe superar los 72 caracteres.

## 📄 Changelog

All notable changes to this package will be documented in [Changelog](./CHANGELOG.md) file.

---

<div align="center">
    <a href="mailto:mdelgado@tresdoce.com.ar" target="_blank" alt="Send an email">
        <img src="./.readme-static/logo-mex-red.svg" width="120" alt="Mex" />
    </a><br/>
    <p>Made with ❤</p>
</div>
