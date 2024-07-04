import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { Managers } from './managers.model';
import { Customers } from 'src/customers/models/customers.model';

@Table({ tableName: 'customer_to_manager_assign', updatedAt: false })
export class CustomerToManagerAssign extends Model<CustomerToManagerAssign> {
  @ForeignKey(() => Customers)
  @Column({
    type: DataType.STRING,
  })
  customerId: string;

  @Column({
    type: DataType.INTEGER,
  })
  cityId: number;

  @ForeignKey(() => Managers)
  @Column({ type: DataType.INTEGER })
  managerId: number;

  @Column({
    type: DataType.STRING,
  })
  comment: string;
}
