module.exports = (sequelize, DataTypes) => {

    const users = sequelize.define("users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: { 
            type: DataTypes.ENUM('Admin', 'Psicologo', 'User'), 
            allowNull: false,
            defaultValue: 'User', 
        },
    });
    
    const messages = sequelize.define('messages', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        from: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        to: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        message: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      });
    

    return users;

    
};
