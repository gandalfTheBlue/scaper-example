import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Scaper demo')
    .setDescription(`Scaper demo.`)
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, swaggerOptions)
  SwaggerModule.setup('api', app, document, {
    // hide swagger schema
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  })
  await app.listen(process.env.PORT)
  console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
