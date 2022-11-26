const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "country",
    {
      id: { primaryKey: true, type: DataTypes.STRING, unique: true },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continent_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      flag_img: { allowNull: false, type: DataTypes.STRING },
      capital: { type: DataTypes.ARRAY(DataTypes.STRING) },
      subregion: { type: DataTypes.STRING },
      area: { type: DataTypes.STRING },
      population: { type: DataTypes.INTEGER },
      coatOfArms: { type: DataTypes.STRING },
      timezones: { type: DataTypes.STRING },
      languages:{type:DataTypes.ARRAY(DataTypes.STRING)}
    },
    { timestamps: false }
  );
};
