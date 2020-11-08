import React, { Component } from 'react'

import { PieChart } from "react-minimal-pie-chart";
import { BarChart } from "reaviz";

export default class UserStatisticsCharts extends Component {
    render() {
        //FILTERED USERS

        const users = this.props.users
        //GET STATISTICS FROM USERS ARRAY
        let users_statistics = {
            total: users.length,
            maleCount: 0,
            femaleCount: 0,
            age1: 0,
            age2: 0,
            age3: 0,
            age4: 0,
            janUsers: 0,
            febUsers: 0,
            marUsers: 0,
            aprUsers: 0,
            mayUsers: 0,
            junUsers: 0,
            julUsers: 0,
            augUsers: 0,
            sepUsers: 0,
            octUsers: 0,
            novUsers: 0,
            decUsers: 0,
          };
        users.map((user) => {
            //GENDER 
            switch (user.gender) {
                case "female":
                users_statistics.femaleCount++;
                break;
                case "male":
                users_statistics.maleCount++;
                break;
                default:
                break;
            }
            //AGE
            switch (true) {
                case 0 < user.age && user.age <= 10:
                users_statistics.age1++;
                break;
                case 10 < user.age && user.age <= 20:
                    users_statistics.age2++;
                break;
                case 20 < user.age && user.age <= 30:
                    users_statistics.age3++;
                break;
                case 30 < user.age && user.age <= 40:
                    users_statistics.age4++;
                break;
                default:
                break;
            }
            //MONTH
            switch (new Date(user.creation_date).getMonth()) {
                case 0:
                users_statistics.janUsers++;
                break;
                case 1:
                users_statistics.febUsers++;
                break;
                case 2:
                users_statistics.marUsers++;
                break;
                case 3:
                users_statistics.aprUsers++;
                break;
                case 4:
                users_statistics.mayUsers++;
                break;
                case 5:
                users_statistics.junUsers++;
                break;
                case 6:
                users_statistics.julUsers++;
                break;
                case 7:
                users_statistics.augUsers++;
                break;
                case 8:
                users_statistics.sepUsers++;
                break;
                case 9:
                users_statistics.octUsers++;
                break;
                case 10:
                users_statistics.novUsers++;
                break;
                case 11:
                users_statistics.decUsers++;
                break;
                default:
                break;
            }
        });
        //AGE CHART DATA
        const age_range_bar_chart_data = [
            { key: "Age(0-10)", data: users_statistics.age1 },
            { key: "Age(10-20)", data: users_statistics.age2 },
            { key: "Age(20-30)", data: users_statistics.age3 },
            { key: "Age(30-40)", data: users_statistics.age4 },
          ];
        //MONTH CHART DATA
        const creation_month_bar_chart_data = [
            { key: "jan", data: users_statistics.janUsers },
            { key: "feb", data: users_statistics.febUsers },
            { key: "mar", data: users_statistics.marUsers },
            { key: "apr", data: users_statistics.aprUsers },
            { key: "may", data: users_statistics.mayUsers },
            { key: "jun", data: users_statistics.junUsers },
            { key: "jul", data: users_statistics.julUsers },
            { key: "aug", data: users_statistics.augUsers },
            { key: "sep", data: users_statistics.sepUsers },
            { key: "oct", data: users_statistics.octUsers },
            { key: "nov", data: users_statistics.novUsers },
            { key: "dec", data: users_statistics.decUsers },
          ];
    
        return (
              <div class="flex px-8 py-8">
          <div class="w-1/3">
          <BarChart data={age_range_bar_chart_data} />
          </div>
          <div class="w-1/3">
          <BarChart data={creation_month_bar_chart_data} />
          </div>
          <div class="w-1/3">
          <PieChart
            data={[
              {
                title: "male",
                value: users.length > 0 ? users_statistics.maleCount / users.length : 0,
                color: "#5E00EC",
              },
              {
                title: "female",
                value: users.length > 0 ? users_statistics.femaleCount / users.length : 0,
                color: "#0EFFBA",
              },
            ]}
            label={({ dataEntry }) => dataEntry.value * users.length}
            labelStyle={(index) => ({
              fontSize: "5px",
              fontFamily: "sans-serif",
            })}
          />
            </div>
          </div>

        )
    }
}
