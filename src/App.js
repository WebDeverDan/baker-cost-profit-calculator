import React, { useState } from "react";
import "./index.css";
import {
  Container,
  Card,
  Form,
  Button,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";

const App = () => {
  const [item, setItem] = useState({});
  const [value, setValue] = useState("");
  const [discountValue, setDiscount] = useState("");
  const [resolvedName, setBakedGoodNameValue] = useState("");
  const [quantityInputValue, setQuantityValue] = useState("");
  const [resolvedPrice, setResolvedPrice] = useState("");
  const [materialCostInputValue, setMaterialCostInputValue] = useState("");
  const [milesInputValue, setMilesInputValue] = useState("");
  const [hoursInputValue, setHoursInputValue] = useState("");
  const [hiddenField, setHiddenFieldClass] = useState("hidden");
  const [hiddenForm, setHiddenFormClass] = useState("block");

  // sets value of the selected baked good from the dropdown
  const handleSelectGood = (selectedGood) => {
    setValue(selectedGood);
    console.log(selectedGood);
    if (selectedGood == "wedding-cake1") {
      let price = 120;
      let goodName = "Single-Tiered Wedding Cake";
      setResolvedPrice(price);
      setBakedGoodNameValue(goodName);
    } else if (selectedGood == "wedding-cake2") {
      let price = 220;
      let goodName = "Double-Tiered Wedding Cake";
      setResolvedPrice(price);
      setBakedGoodNameValue(goodName);
    } else if (selectedGood == "wedding-cake3") {
      let price = 320;
      let goodName = "Triple-Tiered Wedding Cake";
      setResolvedPrice(price);
      setBakedGoodNameValue(goodName);
    } else if (selectedGood == "bday-cake") {
      let price = 120;
      let goodName = "Birthday Cake";
      setResolvedPrice(price);
      setBakedGoodNameValue(goodName);
    } else if (selectedGood == "cookie") {
      let price = 2.0;
      let goodName = "Cookie(s)";
      setResolvedPrice(price);
      setBakedGoodNameValue(goodName);
    } else if (selectedGood == "cupcake") {
      let price = 3.5;
      let goodName = "Cupcake(s)";
      setResolvedPrice(price);
      setBakedGoodNameValue(goodName);
    } else if (selectedGood == "pie") {
      let price = 28;
      let goodName = "Pie(s)";
      setResolvedPrice(price);
      setBakedGoodNameValue(goodName);
    } else if (selectedGood == "small-pastry") {
      let price = 3.5;
      let goodName = "Small Pastry(ies)";
      setResolvedPrice(price);
      setBakedGoodNameValue(goodName);
    } else if (selectedGood == "large-pastry") {
      let price = 5.0;
      let goodName = "Large Pastry(ies)";
      setResolvedPrice(price);
      setBakedGoodNameValue(goodName);
    }
  };

  // sets state for discount input (percentage)
  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  // converts discount percentage to decimal
  function adjustDiscount() {
    const discountPercentage = parseFloat(discountValue) || 0;
    // Convert percentage to decimal (e.g., 15 becomes 0.15)
    const discount = discountPercentage / 100;
    return discount;
  }

  // add new item to be calculated - need to refactor to clean up crazy variable list
  const handleNewCalculationClick = () => {
    // Validate dropdown selections
    if (!value) {
      alert("Please select a type of baked good");
      return;
    }
    if (discountValue === "") {
      alert("Please enter a discount percentage (enter 0 for no discount)");
      return;
    }
    if (parseFloat(discountValue) < 0 || parseFloat(discountValue) > 100) {
      alert("Discount percentage must be between 0 and 100");
      return;
    }

    const discount = adjustDiscount();
    const price = parseInt(resolvedPrice).toFixed(2);
    const quantity = parseInt(quantityInputValue);
    const mileage = ((3.25 / 25) * milesInputValue).toFixed(2);
    const rawMaterialCost = parseInt(materialCostInputValue);
    const materialCost = rawMaterialCost.toFixed(2);
    const materialCostPer = (materialCost / quantity).toFixed(2);
    const preProfit = (quantity * price).toFixed(2);
    const profitPerGood = (preProfit / quantity - materialCostPer).toFixed(2);
    const profit = (preProfit - materialCost - mileage).toFixed(2);
    const hourlyRate = (profit / hoursInputValue).toFixed(2);
    const preHourlyRate = (preProfit / hoursInputValue).toFixed(2);
    const trimmedTitle = resolvedName.trim();
    const bakedGoodName = trimmedTitle.toLowerCase();
    const quantityPrice = quantity * price;
    const transformedQuantityPrice = parseInt(quantityPrice);
    const transformedMileage = parseInt(mileage);
    const totalSum = transformedQuantityPrice + transformedMileage;
    const discountDollar = totalSum * discount;
    const transformedTotalSumWithDicount = (totalSum - discountDollar).toFixed(
      2
    );
    // new item
    const newItem = {
      itemName: bakedGoodName,
      quantity: quantity,
      price: price,
      isSelected: false,
      materialCost: materialCost,
      materialCostPer: materialCostPer,
      preProfit: preProfit,
      profitPerGood: profitPerGood,
      profit: profit,
      mileage: mileage,
      customerOwes: Math.ceil(totalSum),
      hourlyRate: hourlyRate,
      preHourlyRate: preHourlyRate,
      discount: transformedTotalSumWithDicount,
    };

    // sets the css for hiding the form after calculation
    let hiddenField = {
      diaplay: "block",
    };
    setItem(newItem);
    setHiddenFieldClass(hiddenField);
    setHiddenFormClass("hidden");
  };

  // reloads the page and clears it all
  const reloadWindow = () => {
    window.location.reload();
    setHiddenFieldClass();
  };

  return (
    <div className="App">
      <Container fluid className="app-background">
        <div className="app-header">
          <h1 className="app-title">Baked Goods Price and Profit Calculator</h1>
          <div className="add-budget-box">
            <h1 className="instructions">
              {hiddenField === "hidden"
                ? "Having a hard time figuring out what to charge? Follow the steps below to calculate your cost and profit!"
                : "Based on your inputs, below is how much you should charge for the order."}
            </h1>
            <br />
          </div>
        </div>

        <div className={hiddenField}>
          <div>
            <h4>Order: {item.quantity} {item.itemName}</h4>
            <h4>Customer Should Pay (pre discount): ${item.customerOwes}</h4>
          </div>
          <div className="item-list text-dark">
            <div className="item-container ">
              <ul class="list-group text-left">
                <li class="list-group-item">Quantity: {item.quantity} </li>
                <li class="list-group-item">
                  Base Cost per Good: ${item.price}{" "}
                </li>
                <li class="list-group-item">
                  Material Cost per Good: ${item.materialCostPer}
                </li>
                <li class="list-group-item">
                  Material Cost for Job: ${item.materialCost}
                </li>
                <li class="list-group-item">
                  Profit per Good: ${item.profitPerGood}
                </li>
                <li class="list-group-item">
                  Mileage Expenses: ${item.mileage}
                </li>
                <li class="list-group-item">
                  Before Expenses You'll Make: ${item.preProfit}
                </li>
                <li class="list-group-item">
                  After Expenses You'll Make: ${item.profit}
                </li>
                <li class="list-group-item">
                  Pre Expenses Hourly Rate: ${item.preHourlyRate}
                </li>
                <li class="list-group-item">
                  Post Expenses Hourly Rate: ${item.hourlyRate}
                </li>
                <li class="list-group-item">
                  Discounted Price ${item.discount}
                </li>
              </ul>
            </div>
          </div>
          <Button
            className="button-effects refresh-title"
            onClick={() => reloadWindow()}
          >
            New Calculation
          </Button>
        </div>
        <div className={hiddenForm}>
          <Card className="main-container" style={{ background: "lightblue" }}>
            <Form className="add-item-form">
              <DropdownButton
                alignRight
                title="Select Type of Baked Good"
                id="dropdown-menu-align-right"
                onSelect={handleSelectGood}
              >
                <Dropdown.Item eventKey="wedding-cake1">
                  Wedding Cake - 1 Tier
                </Dropdown.Item>
                <Dropdown.Item eventKey="wedding-cake2">
                  Wedding Cake - 2 Tier
                </Dropdown.Item>
                <Dropdown.Item eventKey="wedding-cake3">
                  Wedding Cake - 3 Tier
                </Dropdown.Item>
                <Dropdown.Item eventKey="bday-cake">
                  Brithday Cake
                </Dropdown.Item>
                <Dropdown.Item eventKey="cookie">Cookie</Dropdown.Item>
                <Dropdown.Item eventKey="pie">Pie</Dropdown.Item>
                <Dropdown.Item eventKey="cupcake">Cupcake</Dropdown.Item>
                <Dropdown.Item eventKey="small-pastry">
                  Small Pastry
                </Dropdown.Item>
                <Dropdown.Item eventKey="large-pastry">
                  Large Pastry
                </Dropdown.Item>
              </DropdownButton>
              <br />
              <h5>{resolvedName}</h5>
              <Form.Group className="mb-1" controlId="formEnterItem">
                {/* <Form.Label className="text-dark">Quantity of Baked Good</Form.Label> */}
                <Form.Control
                  type="input"
                  placeholder="Type the quantity of baked good"
                  value={quantityInputValue}
                  onChange={(e) => setQuantityValue(e.target.value)}
                  className="add-item-input"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEnterHours">
                <Form.Label className="text-dark">
                  How Many Hours did it Take?
                </Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Enter hours spent"
                  value={hoursInputValue}
                  onChange={(e) => setHoursInputValue(e.target.value)}
                  className="add-price-input"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEnterMiles">
                <Form.Label className="text-dark">
                  How Many Miles are You Driving to and From Delivery?
                </Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Enter Miles Driven ($1 per mile)"
                  value={milesInputValue}
                  onChange={(e) => setMilesInputValue(e.target.value)}
                  className="add-price-input"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEnterMaterialCost">
                <Form.Label className="text-dark">
                  Total Cost of Materials
                </Form.Label>
                <Form.Control
                  type="input"
                  placeholder="Enter material cost"
                  value={materialCostInputValue}
                  onChange={(e) => setMaterialCostInputValue(e.target.value)}
                  className="add-price-input"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEnterDiscount">
                <Form.Label className="text-dark">
                  Discount Percentage (0-100)
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter discount percentage (e.g., 15 for 15%)"
                  value={discountValue}
                  onChange={handleDiscountChange}
                  className="add-price-input"
                  min="0"
                  max="100"
                  step="0.01"
                  required
                />
              </Form.Group>
              <h5>Discount: {discountValue}%</h5>
              <br />
              <Button
                className="button-effects calculate_button"
                onClick={() => handleNewCalculationClick()}
              >
                Calculate
              </Button>
            </Form>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default App;
