import { useEffect, useState, useRef } from "react";
import CustomerCard from "./components/CustomerCard";
import Spinner from "./components/Spinner";

function CustomerList({ handleCustomer, selectedCustomer }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const ref = useRef();
  console.log(customers);

  useEffect(
    function () {
      async function getCustomers() {
        try {
          setLoading(true);
          const res = await fetch(
            `https://randomuser.me/api/?page=${page}&results=10`
          );
          const data = await res.json();
          console.log(data);

          setCustomers((customers) => [...customers, ...data.results]);
          setLoading(false);
        } catch (error) {
          setError("Something went wrong, Please try again later");
          setLoading(false);
        }
      }
      getCustomers();
    },
    [page]
  );
  useEffect(function () {
    observer.observe(ref.current);
  }, []);

  const observer = new IntersectionObserver(callback, {
    root: null,
    threshold: 0.1,
  });
  function callback(entries) {
    if (entries[0].isIntersecting) setPage((page) => page + 1);
  }

  return (
    <>
      <ul className="customerInfo">
        {customers.map((customer) => (
          <CustomerCard
            key={customer.login.uuid}
            customer={customer}
            handleCustomer={handleCustomer}
            selectedCustomer={selectedCustomer}
          />
        ))}
        <div className="last" ref={ref}></div>
        {loading ? <Spinner /> : ""}
        {error && <p className="error-msg">{error}</p>}
      </ul>
    </>
  );
}

export default CustomerList;
