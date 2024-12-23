// graphql/schema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String
    role: String!
  }

  input EmployeeInput {
    name: String!
    age: Int!
    class: String
    role: String!
  }

  input EmployeeFilter {
    name: String
    class: String
    age: Int
  }

  input PaginationInput {
    page: Int!
    limit: Int!
  }

  type PaginatedEmployees {
    employees: [Employee]
    total: Int
  }

  type Query {
    listEmployees(filter: EmployeeFilter, pagination: PaginationInput): PaginatedEmployees
    getEmployeeDetails(id: ID!): Employee
  }

  type Mutation {
    addEmployee(input: EmployeeInput!): Employee
    updateEmployee(id: ID!, input: EmployeeInput!): Employee
  }
`;

module.exports = typeDefs;