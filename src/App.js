import { useState } from "react";
import CustomerDetails from "./CustomerDetails";
import CustomerList from "./CustomerList";
import Card from "./components/Card";
import ImageContainer from "./components/ImageContainer";

function App() {
  const [customer, setCustomer] = useState({});
  console.log(customer);

  return (
    <div className="container">
      <CustomerList handleCustomer={setCustomer} selectedCustomer={customer} />
      <CustomerDetails>
        <Card customer={customer} />
        <ImageContainer />
      </CustomerDetails>
    </div>
  );
}

export default App;
