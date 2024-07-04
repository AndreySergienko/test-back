import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Managers } from './models/managers.model';
import { CustomerToManagerAssign } from './models/customer-manager.model';

@Module({
  imports: [SequelizeModule.forFeature([Managers, CustomerToManagerAssign])],
  controllers: [],
  providers: [ManagersService],
  exports: [ManagersService],
})
export class ManagersModule {}
