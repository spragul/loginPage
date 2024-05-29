import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Home() {
  const [data, setData] = useState([]);
  async function fetchdata() {
    try {
      const response = await axios.get("https://loginpage-backend-fg2s.onrender.com/user");
      if (response.data.rd == true) {
        toast.success(response.data.message);
        setData(response.data.userlist);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="home">
      <h1>user List</h1>
      <table className="">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
