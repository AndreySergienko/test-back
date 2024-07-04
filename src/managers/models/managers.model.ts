import {
  Column,
  DataType,
  Table,
  Model,
  BelongsToMany,
} from 'sequelize-typescript';
import { ManagersModelAttrs } from '../managers.types';
import { Customers } from 'src/customers/models/customers.model';
import { CustomerToManagerAssign } from './customer-manager.model';

@Table({ tableName: 'managers', createdAt: false, updatedAt: false })
export class Managers extends Model<Managers, ManagersModelAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  fio: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  role: string;

  @Column({
    type: DataType.FLOAT,
    validate: {
      len: [5, 15],
    },
    defaultValue: 0,
  })
  efficiency: number;

  @Column({
    type: DataType.INTEGER,
  })
  attachedClientsCount: number;

  @BelongsToMany(() => Customers, () => CustomerToManagerAssign)
  customers: Customers[];
}
