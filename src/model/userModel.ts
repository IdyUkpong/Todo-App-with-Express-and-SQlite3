import {DataTypes, Model} from 'sequelize';
import db from '../config/database.config';
import { TodoInstance } from './todoModel';

export interface UserAtrributes {
    id:string;
    email:string;
    firstName:string;
    password:string
}


export class UserInstance extends Model<UserAtrributes > {}

UserInstance.init({
    id:{
        type:DataTypes.UUIDV4,
        primaryKey: true,
        allowNull:false
    },
    email: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull:false
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    sequelize: db,
    tableName:"user"
}
)

UserInstance.hasMany(TodoInstance, {foreignKey:'userId', as:'todo'});
TodoInstance.belongsTo(UserInstance, {foreignKey:'userId', as:'user'});