import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customers } from './models/customers.model';
import { Op } from 'sequelize';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customers) private customersRepository: typeof Customers,
  ) {}

  /** Получить список пользователей не получивших заказ */
  async getFreeCustomers() {
    // Странный набор данных, почему бы не привязаться к наличию заказа у юзера, а не дате первого/последнего
    return this.customersRepository.findAll({
      where: {
        lastOrderDate: {
          [Op.is]: null,
        },
      },
    });
  }

  /** Получить список пользователей с заказом
   * Параметр отвечает за клиентов у которых дата первого заказа начинает с > timestamp
   */
  async getCustomersWithOrder(mininalDate: number) {
    return this.customersRepository.findAll({
      where: {
        firstOrderDate: {
          [Op.gte]: mininalDate,
        },
        lastOrderDate: {
          [Op.ne]: null,
        },
      },
    });
  }
}
