import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customers } from './models/customers.model';

@Module({
  imports: [SequelizeModule.forFeature([Customers])],
  controllers: [],
  providers: [CustomersService],
})
export class CustomersModule {}
