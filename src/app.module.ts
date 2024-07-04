import { Module } from '@nestjs/common';
import { ReportsModule } from './reports/reports.module';
import { SequelizeModule } from '@nestjs/sequelize';
import SqlDatabase from './database/samples/SqlDatabase';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { ManagersModule } from './managers/managers.module';
import { Customers } from './customers/models/customers.model';
import { Managers } from './managers/models/managers.model';
import { CustomerToManagerAssign } from './managers/models/customer-manager.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot(
      new SqlDatabase().connect([Customers, Managers, CustomerToManagerAssign]),
    ),
    ReportsModule,
    CustomersModule,
    ManagersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
