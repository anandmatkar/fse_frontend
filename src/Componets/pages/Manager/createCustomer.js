import React, { useState } from "react";
import "./NewCustomerScreen.css";
import { toast } from "react-toastify";

function NewCustomerScreen() {
  // const [customerName, setCustomerName] = useState("");
  const [customerAccount, setCustomerAccount] = useState("");
  const [country, setCountry] = useState("");
  const [customerContact, setCustomerContact] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [lineNumber, setLineNumber] = useState("");
  const [scopeOfWork, setScopeOfWork] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  

  const handleSubmit = (event) => {
    event.preventDefault();

    const customerData = {
      name: customerName,
      account: customerAccount,
      country: country,
      contact: customerContact,
      phone: phone,
      email: email,
      lineNumber: lineNumber,
      scopeOfWork: scopeOfWork,
    };

    setIsLoading(true);

    fetch("http://localhost:3003/api/v1/customer/createCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept":"application/json"
      },
      body: JSON.stringify(customerData),
    })
      .then((response) => {
        if (response.ok) {
          // Reset form fields
          setCustomerName("");
          setCustomerAccount("");
          setCountry("");
          setCustomerContact("");
          setPhone("");
          setEmail("");
          setLineNumber("");
          setScopeOfWork("");
          setShowPopup(true);

          // Show success toast message
          
          toast.success("New customer created!");
        } else {
          // Show error toast message
          toast.error("Error creating new customer.");
        }
      })


      .catch((error) => {
        console.error("Error:", error);
        // Show error toast message
        toast.error("Error creating new customer.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="new-customer-screen">
      <h2>New Customer</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            id="customerName"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="customerAccount">Customer Account</label>
          <input
            type="text"
            id="customerAccount"
            value={customerAccount}
            onChange={(event) => setCustomerAccount(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            required
          >
            <option value="" disabled>
              Select Country
            </option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
            <option value="Algeria">Algeria</option>
            {/* Add more country options as needed */}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="customerContact">Customer Contact</label>
          <input
            type="text"
            id="customerContact"
            value={customerContact}
            onChange={(event) => setCustomerContact(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lineNumber">Line Number</label>
          <input
            type="text"
            id="lineNumber"
            value={lineNumber}
            onChange={(event) => setLineNumber(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="scopeOfWork">Scope of Work</label>
          <textarea
            id="scopeOfWork"
            value={scopeOfWork}
            onChange={(event) => setScopeOfWork(event.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
        Validate
        </button>
      </form>
      {showPopup && <div className="popup">New customer created!</div>}
    </div>
  );
}

export default NewCustomerScreen;



