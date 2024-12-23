const { Op } = require('sequelize');
const {Employee} = require('../../models/index');
const { checkRole } = require('../../middleware/auth');

const resolvers = {
  Query: {
    listEmployees: async (_, { filter, pagination }, { user }) => {
      checkRole(user, ['Admin']);

      const { page = 1, limit = 10 } = pagination || {};
      const where = {};

      if (filter) {
        if (filter.name) {
          where.name = { [Op.iLike]: `%${filter.name}%` };
        }
        if (filter.class) {
          where.class = filter.class;
        }
        if (filter.age) {
          where.age = filter.age;
        }
      }

      const total = await Employee.count({ where });
      const employees = await Employee.findAll({
        where,
        limit,
        offset: (page - 1) * limit,
        order: [['name', 'ASC']],
      });

      return { employees, total };
    },
    getEmployeeDetails: async (_, { id }, { user }) => {
      checkRole(user, ['Admin', 'Employee']);
      return await Employee.findByPk(id);
    },
  },
  Mutation: {
    addEmployee: async (_, { input }, { user }) => {
      checkRole(user, ['Admin']);
      return await Employee.create(input);
    },
    updateEmployee: async (_, { id, input }, { user }) => {
      checkRole(user, ['Admin']);
      const employee = await Employee.findByPk(id);
      if (!employee) throw new Error('Employee not found');
      return await employee.update(input);
    },
  },
};

module.exports = resolvers;
