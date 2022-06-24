import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Test {
    @PrimaryGeneratedColumn()
    readonly id: number;

    @Column('text', { nullable: false })
    text: string;

    @CreateDateColumn()
    readonly created_at?: Date;

    @UpdateDateColumn()
    readonly updated_at?: Date;

    constructor(text: string) {
        this.text = text;
    }
}
