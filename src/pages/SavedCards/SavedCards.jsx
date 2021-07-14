import React, { useState } from "react";
import Sidebar from "../../components/pages/Dashboard/Sidebar/Sidebar";
import CategoriesCircles from "../../components/common/CategoriesCircles/CategoriesCircles";
import NewCard from "../../components/pages/Dashboard/Payments/NewCard/NewCard";
import ManageSavedCard from "../../components/pages/Dashboard/Payments/ManageSavedCard/ManageSavedCard";
function SavedCards() {
  const [addingNewCard, setAddingNewCard] = useState(false);
  const [values, setValues] = useState({
    cardNumber: "",
    nameOnCard: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleAddCard = () => setAddingNewCard(true);
  const handleSaveCard = () => setAddingNewCard(false);

  console.log(addingNewCard);
  return (
    <div className="d-flex my-20px">
      <div className="container-with-circles">
        <div className="circlesContainer">
          <CategoriesCircles />
        </div>
        <div className="d-flex h-100">
          <Sidebar />
          <div className="w-100">
            <h2>Manage Saved Cards</h2>
            <NewCard
              handleAddCard={handleAddCard}
              addingNewCard={addingNewCard}
              values={values}
              handleChange={handleChange}
              handleSaveCard={handleSaveCard}
            />
            <ManageSavedCard />
            <div className="mt-50px">
              <h3 className="font-weight-normal">
                Why is my Card being saved on RIVA?
              </h3>
              <p className="greyText mt-12px">
                It's quicker. You can save the hassle of typing in the complete
                card information every time you shop at RIVA by saving your card
                details. You can make your payment by selecting the saved card
                of your choice at checkout. While this is obviously faster, it
                is also very secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedCards;
