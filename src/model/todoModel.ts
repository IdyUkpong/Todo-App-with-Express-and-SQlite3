import {DataTypes, Model} from 'sequelize';
import db from '../config/database.config';

export interface TodoAtrributes {
    id:string;
    description:string;
    completed: boolean;
    userId:string;
}


export class TodoInstance extends Model<TodoAtrributes > {}

TodoInstance.init({
    id:{
        type:DataTypes.UUIDV4,
        primaryKey: true,
        allowNull:false
    },
    description: {
        type:DataTypes.STRING,
        allowNull:false
    },
    completed: {
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    userId: {
        type: DataTypes.UUIDV4,
    }
},{
    sequelize: db,
    tableName:"todo"
}
);



