function CustomerCard({ customer, handleCustomer, selectedCustomer }) {
  const { name, picture, location } = customer;

  return (
    <li
      className={`preview ${
        selectedCustomer?.uuid === customer?.login?.uuid ? "active" : ""
      }`}
      onClick={() =>
        handleCustomer({ name, picture, location, uuid: customer.login.uuid })
      }
    >
      <img
        className="fig"
        src={picture.thumbnail}
        alt={`${name.title} ${name.first}`}
      />

      <div>
        <h4>{`${name.title} ${name.first}`}</h4>
        <p>{`${location.city}, ${location.country}`}</p>
      </div>
    </li>
  );
}

export default CustomerCard;
