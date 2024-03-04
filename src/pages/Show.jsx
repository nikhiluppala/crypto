import React from "react";
import showStore from "../stores/showStore";
import { useParams } from "react-router-dom";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Header } from "../components/Header";


export default function Show() {
  const store = showStore();
  const params = useParams();

 

  React.useEffect(() => {
    store.fetchData(params.id);
    return () => {
         store.reset();
    }
  }, []);

  if(!store.Data.data) return <></> 

  
  return (
    <div>
        <Header back/>
       <header className="show-header">
        <img src={store.Data.data.image.large} />
        <h2>
            {store.Data.data.name} ({store.Data.data.symbol})
        </h2>
       </header>
       <div className="width">
        <div className="show-graph">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={store.graphData}
                    margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
       </div>
       <div className="width">
            <div className="show-details">
                    <h2>Details</h2>
                <div className="show-details-row">
                    <h3>Market cap rank</h3>
                    <span>${store.Data.data.market_cap_rank}</span>
                </div>
                <div className="show-details-row">
                    <h3>24h high</h3>
                    <span>${store.Data.data.market_data.high_24h.usd}</span>
                </div>
                <div className="show-details-row">
                    <h3>24h low</h3>
                    <span>${store.Data.data.market_data.low_24h.usd}</span>
                </div>
                <div className="show-details-row">
                    <h3>Circulating Supply</h3>
                    <span>${store.Data.data.market_data.circulating_supply}</span>
                </div>
                <div className="show-details-row">
                    <h3>Current Price</h3>
                    <span>${store.Data.data.market_data.current_price.usd}</span>
                </div>
                <div className="show-details-row">
                    <h3>1y change</h3>
                    <span>${store.Data.data.market_data.price_change_percentage_1y.toFixed(4)}%</span>
                </div>
            </div>
      </div>
      
    </div>
  );
}
