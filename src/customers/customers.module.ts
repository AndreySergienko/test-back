import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';

@Module({
  imports: [],
  controllers: [],
  providers: [CustomersService],
})
export class CustomersModule {}
