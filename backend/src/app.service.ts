// filepath: c:\Users\CDXTELECOM\Downloads\Fluent-IA\fullstack-app\backend\src\app.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}