module.exports = (sequelize, DataTypes) => {
    const consultas = sequelize.define("consultas", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      data: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      hora: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      psicólogo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "psicólogos",
          key: "id",
        },
      },
      paciente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "pacientes",
          key: "id",
        },
      },
      descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    });
  
    consultas.associate = (models) => {
      consultas.belongsTo(models.psicólogos, { foreignKey: "psicólogo_id" });
      consultas.belongsTo(models.pacientes, { foreignKey: "paciente_id" });
    };
  
    return consultas;
  };


  module.exports = (sequelize, DataTypes) => {
    const psicólogos = sequelize.define("psicólogos", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      especialidade: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return psicólogos;
  };
  
  module.exports = (sequelize, DataTypes) => {
    const pacientes = sequelize.define("pacientes", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idade: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    return pacientes;
  };