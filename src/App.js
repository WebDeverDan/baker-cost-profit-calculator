import React, { useState } from "react";
import "./index.css";
import {Container , Card, Form, Button} from 'react-bootstrap'  


const App = () => {
  const [item, setItem] = useState({});
  const [inputNameValue, setNameInputValue] = useState("") 
  const [quantityInputValue, setQuantityValue] = useState("")
  const [priceInputValue, setPriceInputValue] = useState("")
  const [materialCostInputValue, setMaterialCostInputValue] = useState("")
  const [milesInputValue, setMilesInputValue] = useState("")
  const [hoursInputValue, setHoursInputValue] = useState("")
  const [hiddenField, setHiddenFieldClass] = useState("hidden")
  

  // const handleShowData = () => {
  //   let hiddenField = {
  //     diaplay: "block" }
  // };

  // add new item to be calculated
  const handleNewCalculationClick = () => {
    const price = priceInputValue;
    const quantity = parseInt(quantityInputValue);
    const mileage = ((3.25 / 25) * milesInputValue).toFixed(2);
    const rawMaterialCost = parseInt(materialCostInputValue)
    const materialCost = rawMaterialCost.toFixed(2);
    const materialCostPer = (materialCost / quantity).toFixed(2);
    const preProfit = (quantity * price).toFixed(2);
    const profitPerGood = ((preProfit/quantity) - materialCostPer).toFixed(2);
    const profit = (preProfit - materialCost - mileage).toFixed(2);
    const hourlyRate = (profit/hoursInputValue).toFixed(2);
    const preHourlyRate = (preProfit/hoursInputValue).toFixed(2);
    // const customerOwes = 
    console.log(priceInputValue)
    const newItem = {
      itemName: inputNameValue,
      quantity: quantity,
      price: price,
      isSelected: false,
      materialCost: materialCost,
      materialCostPer: materialCostPer,
      preProfit: preProfit,
      profitPerGood: profitPerGood,
      profit: profit,
      mileage: mileage,
      customerOwes: quantity * price,
      hourlyRate: hourlyRate,
      preHourlyRate: preHourlyRate
    };
    let hiddenField = {
      diaplay: "block" }
    setItem(newItem);
    setHiddenFieldClass(hiddenField)
  };

  // reloads the page and clears it all
  const reloadWindow = () => {
  window.location.reload();
  setHiddenFieldClass("hidden")
  };

  return (
    <div className="App">
      <Container fluid className="app-background">
        <h1 className="app-title">Baked Goods Price and Profit Calculator</h1>
        <div className="add-budget-box">
          <h1 className="instructions">
            Follow the Steps Below to Calculate How Much You Need to Charge - Based on what YOU Deserve!
          </h1>
        </div>
      <div className={hiddenField}>
        <div>
            <br/>
              <h2>{item.itemName}</h2>
              <h3>Customer Should Pay: ${item.customerOwes}</h3>
          </div>
					<div className="item-list text-dark">
            <div className="item-container ">
              <ul class="list-group text-left">
              <li class="list-group-item">Quantity: {item.quantity} </li>
                <li class="list-group-item">Base Cost per Good: ${item.price} </li>
                <li class="list-group-item">Material Cost per Good: ${item.materialCostPer}</li>
                <li class="list-group-item">Material Cost for Job: ${item.materialCost}</li>
                {/* <li class="list-group-item">Out of Pocket Expenses: ${item.outOfPocket}</li> */}
                <li class="list-group-item">Profit per Good: ${item.profitPerGood}</li>
                {/* <li class="list-group-item">Before Expenses You'll Make: ${item.preHourlyBreakdown}/hr</li> */}
                {/* <li class="list-group-item">After Expenses You'll Make: ${item.hourlyBreakdown}/hr</li> */}
                <li class="list-group-item">Mileage Expenses: ${item.mileage}</li>
                <li class="list-group-item">Before Expenses You'll Make: ${item.preProfit}</li>
                <li class="list-group-item">After Expenses You'll Make: ${item.profit}</li>
                <li class="list-group-item">Pre Expenses Hourly Rate: ${item.preHourlyRate}</li>
                <li class="list-group-item">Post Expenses Hourly Rate: ${item.hourlyRate}</li>
              </ul>
            </div>
          </div>
          <Button
            className="button-effects refresh-title"
            onClick={() => reloadWindow()}
          >Start Over
        </Button>
        </div>
        <Card className="main-container">
          <Form className="add-item-form">
          <Form.Group className="mb-1" controlId="formEnterItem">
              <Form.Label className="text-dark">Name of Baked Good</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter name of baked good"
                value={inputNameValue}
                onChange={(e) => setNameInputValue(e.target.value)}
                className="add-item-input"
              />
            </Form.Group>
            <Form.Group className="mb-1" controlId="formEnterItem">
              <Form.Label className="text-dark">Quantity of Baked Goods</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter quantity of goods"
                value={quantityInputValue}
                onChange={(e) => setQuantityValue(e.target.value)}
                className="add-item-input"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEnterCost">
              <Form.Label className="text-dark">Cost per Baked Good</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter cost per good"
                value={priceInputValue}
                onChange={(e) => setPriceInputValue(e.target.value)}
                className="add-price-input"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEnterHours">
              <Form.Label className="text-dark">How Many Hours did it Take?</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter hours spent"
                value={hoursInputValue}
                onChange={(e) => setHoursInputValue(e.target.value)}
                className="add-price-input"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEnterMiles">
              <Form.Label className="text-dark">How Many Miles are You Driving to and From Delivery?</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter Miles Driven ($1 per mile)"
                value={milesInputValue}
                onChange={(e) => setMilesInputValue(e.target.value)}
                className="add-price-input"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEnterMaterialCost">
              <Form.Label className="text-dark">Total Cost of Materials</Form.Label>
              <Form.Control
                type="input"
                placeholder="Enter material cost"
                value={materialCostInputValue}
                onChange={(e) => setMaterialCostInputValue(e.target.value)}
                className="add-price-input"
              />
            </Form.Group>
            <Button
            className="button-effects"
            onClick={() => handleNewCalculationClick()}
          >Calculate</Button>
          </Form>
        </Card>
      </Container>
    </div>
  );
};  

export default App;