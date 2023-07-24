import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/Overview.module.css";

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchTodayOverview();
  }, []);

  const fetchTodayOverview = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const token = userInfo.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          username: userInfo.username,
        },
      };
      const response = await axios.get(
        "http://localhost:4000/api/home",
        config
      );
      const todayOverview = response.data;
      setData(todayOverview);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching today's overview:", error);
      setLoading(false);
      // Handle error scenarios or display an error message to the user
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No data available</p>;
  }

  // Convert the data to the correct format
  const totalSales = parseFloat(data.totalSales).toFixed(2);
  const averageOrderCost = parseFloat(data.averageOrderCost).toFixed(2);

  return (
    <div className={styles.homePageContainer}>
      <h2>Today's Overview</h2>
      <div className={styles.overviewData}>
        <div>
          <p>Total Sales:</p>
          <p>${totalSales}</p>
        </div>
        <div>
          <p>Order Count:</p>
          <p>{data.orderCount}</p>
        </div>
        <div>
          <p>Average Order Cost:</p>
          <p>${averageOrderCost}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
