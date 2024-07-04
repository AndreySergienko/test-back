import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { CustomersModelAttrs } from '../customers.types';
import { Managers } from 'src/managers/models/managers.model';
import { CustomerToManagerAssign } from 'src/managers/models/customer-manager.model';

@Table({ tableName: 'customers', createdAt: false, updatedAt: false })
export class Customers extends Model<Customers, CustomersModelAttrs> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    unique: true,
  })
  cityId: number;

  @Column({
    type: DataType.STRING,
  })
  fio: string;

  @Column({
    type: DataType.STRING,
    validate: {
      len: [10, 12],
    },
  })
  phone: string;

  @Column({
    type: DataType.BIGINT,
    validate: {
      len: [5, 15],
    },
    defaultValue: 0,
  })
  firstOrderDate: number;

  @Column({
    type: DataType.STRING,
    validate: {
      len: [5, 25],
    },
    allowNull: true,
  })
  lastOrderDate: string;

  @BelongsToMany(() => Managers, () => CustomerToManagerAssign)
  managers: Managers[];
}
