import React, { Component } from 'react'

export default class UsersTable extends Component {
  render() {
    //FILTERED USERS
    const users = this.props.users
    return (
      <div class="md:px-5 py-8 w-full">
        <div class="shadow overflow-hidden rounded border-b border-gray-200">
          <table class="min-w-full bg-white">
            <thead class="bg-gray-800 text-white">
              <tr>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">First Name</th>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Last name</th>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Full Name</th>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Gender</th>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Number Of Messages</th>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Age</th>
                <th class="text-left py-3 px-4 uppercase font-semibold text-sm">Creation Date</th>
              </tr>
            </thead>
            <tbody class="text-gray-700 " style={{height: '50vh'}}>
            {users.map((user)=> (
                  <tr key={user._id}>
                    <td class="text-center py-3 px-4">{user.first_name}</td>
                    <td class="text-center py-3 px-4">{user.last_name}</td>
                    <td class="text-center py-3 px-4">{user.full_name}</td>
                    <td class="text-center py-3 px-4">{user.gender}</td>
                    <td class="text-center py-3 px-4">{user.number_of_messages}</td>
                    <td class="text-center py-3 px-4">{user.age}</td>
                    <td class="text-center py-3 px-4">{new Date(user.creation_date).getDay()} / 
                    {new Date(user.creation_date).getMonth() +1} /
                    {new Date(user.creation_date).getFullYear()}</td>
                  </tr>  
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
