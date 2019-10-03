module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define("user", {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
 
        companyname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        companyaddress: {
            type: Sequelize.STRING,
            notEmpty: true
        },
 
        telnumber: {
            type: Sequelize.INTEGER,
            validate: { max: 9}
        },
 
        size: {
            type: Sequelize.INTEGER,
            validate: { max: 10 }
        },
 
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
 
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
 
        area: {
            type: Sequelize.STRING,
            equals: "Phiadelphia"
        },
 
        service: {
            type: Sequelize.STRING,
            isArray: true
        }
 
 
    });
 
    return User;
 
}