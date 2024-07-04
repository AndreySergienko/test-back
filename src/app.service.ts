import { ReportsService } from './reports/reports.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { CustomersService } from './customers/customers.service';
import { ManagersService } from './managers/managers.service';
import { Customers } from './customers/models/customers.model';
import { ManagerRoles } from './managers/ManagerRoles';
import { Managers } from './managers/models/managers.model';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    private customersService: CustomersService,
    private managersService: ManagersService,
    private reportsService: ReportsService,
  ) {}

  /** Проверить в момент итерации пользователя, а ТОЧНО менеджр свободен */
  private async findFreeManager(managers: Managers[]) {
    let freeManager: Managers;
    for (let i = 0; i < managers.length; i++) {
      const manager = managers[0];
      const candidate =
        await this.managersService.findByIdWithCheckClientsCount(manager.id);
      if (!candidate) continue;
      freeManager = candidate;
      break;
    }

    return freeManager;
  }

  /** Обновить менеджера для пользователя */
  private async updateManagersForCustomers({
    customers,
    isFree,
  }: {
    isFree: boolean;
    customers: Customers[];
  }) {
    const role = isFree ? ManagerRoles.ATTRACTION : ManagerRoles.PERSONAL;
    const managers =
      await this.managersService.getAllManagerSortedEffective(role);
    for (let i = 0; i < customers.length; i++) {
      const customer = customers[i];

      /** Проверяем на момент выполнения текущей интерации доступного менеджера */
      const freeManager = await this.findFreeManager(managers);

      await customer.$set('managers', [freeManager.id]);
    }
  }

  /** Выполнить скрипт при старте приложения
   * P.S менеджер никогда не будет запускать скрипт - для этого будет нужна ручка, кнопка, крутилка, свистелка - на будущее можно вынести из модуль инит в дефолт метод, дёргать из контроллера
   */
  async onModuleInit() {
    const freeCustomers = await this.customersService.getFreeCustomers();
    const customersWithOrder =
      await this.customersService.getCustomersWithOrder(
        +new Date('06/03/2024'),
      );
    await this.updateManagersForCustomers({
      customers: freeCustomers,
      isFree: true,
    });
    await this.updateManagersForCustomers({
      customers: customersWithOrder,
      isFree: false,
    });
    this.reportsService.createDocuments([{}]);
  }
}
