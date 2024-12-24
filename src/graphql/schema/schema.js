// graphql/schema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
 scalar FileUpload
  type Employee {
    id: ID!
    name: String!
    age: Int!
    class: String
    role: String!
    file:File!
  }

  input EmployeeInput {
    name: String!
    age: Int!
    class: String
    role: String!
  }
  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
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
    uploadFile(file: FileUpload!): File!
  }
`;

module.exports = typeDefs;