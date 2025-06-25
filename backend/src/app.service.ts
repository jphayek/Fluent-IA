import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Fluent IA Backend API is running! 🚀';
  }
}