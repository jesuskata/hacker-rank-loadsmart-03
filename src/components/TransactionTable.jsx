import React, { useState } from "react";

function TransactionTable({txns}) {
  const [clicked, setClicked] = useState(false);
  const [dateValue, setDateValue] = useState('');
  const [data, setData] = useState(txns);

  const handleSortByAmount = () => {
    setClicked(!clicked);
    if (clicked) {
      const ascData = txns.sort((a, b) => parseInt(b.amount, 10) - parseInt(a.amount, 10));
      setData(ascData);
    } else {
      const descData = txns.sort((a, b) => parseInt(a.amount, 10) - parseInt(b.amount, 10));
      setData(descData);
    }
  };

  const handleDateChange = (e) => {
    setDateValue(e.target.value);

  };

  const handleFilterTable = () => {
    if (dateValue !== '') {
      const filteredValues = txns.filter((item) => item.date === dateValue);
      setData(filteredValues);
    }
  }

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <label className="mr-10">Transaction Date</label>
        <input id="date" type="date" defaultValue="2019-11-29" onChange={(e) => handleDateChange(e)} />
        <button className="small" disabled={dateValue === ''} onClick={handleFilterTable}>Filter</button>
      </section>

      <div className="card mt-50">
          <table className="table">
              <thead>
              <tr className="table">
                  <th className="table-header">Date</th>
                  <th className="table-header">Description</th>
                  <th className="table-header">Type</th>
                  <th className="table-header">
                    <span style={{ cursor: 'pointer' }} id="amount" onClick={handleSortByAmount}>Amount ($)</span>
                  </th>
                  <th className="table-header">Available Balance</th>
              </tr>
              </thead>
              <tbody>
              {data.map((item) => {
                return (
                  <tr key={item.description}>
                    <td>{item.date}</td>
                    <td>{item.description}</td>
                    <td>{item.type === 1 ? "Debit" : "Credit"}</td>
                    <td>{item.amount}</td>
                    <td>{item.balance}</td>
                  </tr>
                )
              })}
              </tbody>
          </table>
      </div>
    </div>
  );
}

export default TransactionTable;
