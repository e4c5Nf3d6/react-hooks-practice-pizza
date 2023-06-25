import React, {useState, useEffect} from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([])
  const [pizzaToEdit, setPizzaToEdit] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
    .then(r => r.json())
    .then(data => setPizzas(data))
  }, [])

  function handleEditPizza(e) {
    const value = e.target.type === 'radio' ? ( e.target.value === "Vegetarian" ? true : false ) : e.target.value
    const key = e.target.name
    setPizzaToEdit({...pizzaToEdit, [key]:value})
  }

  function handleSubmitForm(e) {
    e.preventDefault()
    fetch(`http://localhost:3001/pizzas/${pizzaToEdit.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pizzaToEdit)
    })
    .then(r => r.json())
    .then(data => {
      const updatedPizzas = pizzas.map(pizza => {
        if (pizza.id === data.id) {
          return data
        } else {
          return pizza
        }
      })
      setPizzas(updatedPizzas)
    })
  }

  return (
    <>
      <Header />
      <PizzaForm pizza={pizzaToEdit} onEditPizza={handleEditPizza} onSubmitForm={handleSubmitForm} />
      <PizzaList pizzas={pizzas} onEditPizza={setPizzaToEdit} />
    </>
  );
}

export default App;
