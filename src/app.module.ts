import { Module } from '@nestjs/common';
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { LineParserService } from './parser/line-parser.service';
import { RegistroValidatorService } from './registros/registro-validator.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  controllers: [UploadController, AppController],
  providers: [
    UploadService,
    LineParserService,
    RegistroValidatorService,
    AppService,
  ],
})
export class AppModule {}
