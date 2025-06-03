import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("otp")
export class Otp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "text",
    nullable: true,
    name: "otp",
  })
  otp: string;

  @Column({
    type: "text",
    nullable: true,
    name: "ref_code",
  })
  refCode: string;

  @Column({
    type: "text",
    nullable: true,
    name: "username",
  })
  username: string;

  @Column({
    name: "attempt_remaining",
    type: "int",
  })
  attemptRemaining: number;

  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    name: "updated_at",
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: "timestamp",
    name: "deleted_at",
  })
  deletedAt: Date;
}
