import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Managers } from './models/managers.model';
import { Op } from 'sequelize';

@Injectable()
export class ManagersService {
  constructor(
    @InjectModel(Managers) private managersRepository: typeof Managers,
  ) {}

  /** Найти только свободного менеджера по id  */
  async findByIdWithCheckClientsCount(id: number) {
    return this.managersRepository.findOne({
      where: {
        id,
        attachedClientsCount: {
          [Op.lt]: 3000,
        },
      },
    });
  }

  /** Получить список менеджерров отсортированных в порядке убывания по эффективности */
  async getAllManagerSortedEffective(role: string) {
    return this.managersRepository.findAll({
      where: {
        role,
      },
      order: ['efficiency', 'DESC'],
    });
  }
}
