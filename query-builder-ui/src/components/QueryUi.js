import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import QueryBuilder from "react-querybuilder";

import ReactExport from "react-export-excel";

import '../assets/query.css'
import { getUsers } from "../actions/userActions";

import UsersTable from "./UsersTable";
import UserStatisticsCharts from "./UserStatisticsCharts";

class QueryUi extends Component {

  //QUERY CHANGE LISTENER
  onQueryChange = (query) => {
    //INITIATE GET USER ACTION
    this.props.getUsers(query);
  };

  render() {
    try {
      //FILTERED USERS
      const { users } = this.props.users;

      //QUERY FIELDS
      const query_fields = [
        { name: "first_name", label: "First Name"  },
        { name: "last_name", label: "Last Name" },
        { name: "full_name", label: "Full name"  },
        { name: "gender", label: "Gender"  },
        { name: "number_of_messages",label: "Number of messages"},
        { name: "age", label: "age" },
        { name: "creation_date", label: "Creation date"}
      ];
      //QUERY OPERATORS
      const query_operators = [
        { name: "=", label: "=" },
        { name: "!=", label: "!=" },
        { name: "<", label: "<" },
        { name: ">", label: ">" },
        { name: "startsWith", label: "starts with" },
        { name: "endsWith", label: "ends with" },
        { name: "contains", label: "contains" },
        { name: "exact", label: "exact" },
      ];
      //QUERY COMBINATOR
      const query_combinator = [
        { name: '$and', label: 'AND' },
        { name: '$or', label: 'OR' }
      ];
      //CUSTUM UI FOR SOME COMPONENTS OF QUERY
      //ADD RULE BUTTON
      const AddRuleBtn = ({ handleOnClick }) => (
        <button onClick={(e) => handleOnClick(e)} 
          class=" bg-green-500 hover:bg-green-700 
          text-white font-bold py-2 px-4 rounded m-2">+
        </button>
      );
      //REMOVE RULE BUTTON
      const RemoveRuleBtn = ({ handleOnClick }) => (
        <button onClick={(e) => handleOnClick(e)}  
          class="float-right bg-red-500 hover:bg-red-700 
          text-white font-bold py-2 px-4 rounded">x
        </button>
      );

      //EXCEL EXPORT 
      const ExcelFile = ReactExport.ExcelFile;
      const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
      const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

            return (
        <div>
          <QueryBuilder
            fields={query_fields}
            operators={query_operators}
            combinators = {query_combinator}
            onQueryChange={this.onQueryChange}
            controlElements={{addRuleAction: AddRuleBtn,
               removeRuleAction: RemoveRuleBtn
              }}
          />
          
              <p class="text-center px-8 py-8">
              <p class="text-xl font-sans">Total Users ({users.length})</p>
            <ExcelFile element ={<button class="text-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Export Users ( Excel )</button>}>
                <ExcelSheet data={users} name="Users">
                    <ExcelColumn label="First Name" value="first_name"/>
                    <ExcelColumn label="Last Name" value="last_name"/>
                    <ExcelColumn label="Full Name" value="full_name"/>
                    <ExcelColumn label="Gender" value="gender"/>
                    <ExcelColumn label="Number Of Messages" value="number_of_messages"/>
                    <ExcelColumn label="Age" value="age"/>
                    <ExcelColumn label="Creation Date" value="creation_date"/>
                </ExcelSheet>
              </ExcelFile>
              </p>

          <UserStatisticsCharts users={users}/>

          <UsersTable users={users}/>

        </div>
      );
    } catch (error) {
      return (
        <div>
          <p>SOMETHING GOING WRONG</p>
        </div>
      );
    }
  }
}
QueryUi.propTypes = {
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps, {
  getUsers,
})(QueryUi);


