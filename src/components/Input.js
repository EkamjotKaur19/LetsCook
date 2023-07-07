import React, {useState} from 'react';
import axios from 'axios';
import RecipeItem from './RecipeItem';
import Failure from './Failure';
import Spinner from './Spinner/Spinner';
import Pages from './Pages';

const APP_ID = '0a7886f6';
const APP_KEY = '863b7ffa2de0ae6449ab6c79585f6254';

export default function Input() {
    const [searchTerm, setSearchTerm]=useState('');
    const [search, setSearch] = useState(false)
    const [ loading, setLoading ] =useState(false)
    const [list, setList] = useState([]);
    const [timeoutId, setTimeoutId] = useState();
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const cuisines = ['American', 'Asian', 'British', 'French', 'Greek',  'Indian', 'Italian', 'Chinese', 'Japanese', 'Korean', 'Mexican', 'South american', 'South east asian', 'World']
    const [selectedMeal, setSelectedMeal] = useState('');
    const meal = ['Breakfast', 'Lunch/Dinner', 'Brunch', 'Snack', 'Teatime']
    const [selectedDish, setSelectedDish] = useState('');
    const dish = ['alcohol cocktail', 'biscuits and cookies', 'bread', 'cereals', 'condiments and sauces', 'desserts', 'drinks', 'egg', 'ice cream and custard', 'main course', 'pancake', 'pizza', 'pasta', 'pastry', 'pies and tarts', 'pizza', 'salad', 'sandwiches', 'seafood', 'side dish', 'soup', 'starters', 'sweets'
  ]
  const [page, setPage]=useState(1);
const resultsPerPage = 10;

    const handleCuisineChange = (event) => {
      setSelectedCuisine(event.target.value);
    };

    const handleMealChange = (event) => {
      setSelectedMeal(event.target.value);
    };

    const handleDishChange = (event) => {
      setSelectedDish(event.target.value);
    };

    const handleApply = () => {
      fetchData(searchTerm, selectedCuisine, selectedMeal, selectedDish);
    }

    const handleNext = ()=> {
      setLoading(true)
      setPage(page+1)
      fetchData(searchTerm, selectedCuisine, selectedMeal, selectedDish);

    }

    const handlePrev = ()=> {
      setLoading(true)
      setPage(page-1)
      fetchData(searchTerm, selectedCuisine, selectedMeal, selectedDish);
      setLoading(false)
    }

    const fetchData = async (searchTerm, selectedCuisine, selectedMeal, selectedDish) => {
      setLoading(true)
      const cuisineParam = selectedCuisine ? `&cuisineType=${selectedCuisine}` : '';
      const mealParam = selectedMeal ? `&mealType=${selectedMeal}` : '';
      const dishParam = selectedDish ? `&dishType=${selectedDish}` : '';
      const from = (page-1) * resultsPerPage;
      const to = page * resultsPerPage - 1;
      const response = await axios.get(
        `https://api.edamam.com/search?q=${searchTerm}${cuisineParam}${mealParam}${dishParam}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${from}&to=${to}`
      );
      console.log(response);
      setList(response.data.hits);
      setLoading(false)
    }
  
  
    const handleSearchTerm = (event) => {
      clearTimeout(timeoutId);
      setSearchTerm(event.target.value);
      {event.target.value === '' ? setSearch(false) : setSearch(true)};
      {event.target.value === '' ? setPage(1) : setSearch(true)};
      {event.target.value === '' ? setList([]) : setSearch(true)};
      const timeout = setTimeout(() => fetchData(event.target.value), 500);
      setTimeoutId(timeout);
    }

    const handleSubmit = (event) => {
      event.preventDefault();
    }

  return (
    <>
        <div id="inp" className="search-box">
          <div class="input-group" onSubmit={handleSubmit}>
            <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={searchTerm} onChange={handleSearchTerm} />
            <button type="button" class="btn btn-search btn-outline-primary">search</button>
          </div>
          <div className="filter">
            <p className='fil-text' >Refine your Search</p>
        
  <select  class="btn btn-secondary dropdown-toggle  filter-btn" data-toggle="dropdown" value={selectedCuisine} onChange={handleCuisineChange}>
        <option className='filter-opt' value="">All Cuisine</option>
        {cuisines.map((cuisine) => (
          <option className='filter-opt' key={cuisine} value={cuisine}>
            {cuisine}
          </option>
        ))}
      </select>

      <select class="btn btn-secondary dropdown-toggle filter-btn" data-toggle="dropdown" value={selectedMeal} onChange={handleMealChange}>
        <option className='filter-opt' value="">All Meals</option>
        {meal.map((meal) => (
          <option className='filter-opt' key={meal} value={meal}>
            {meal}
          </option>
        ))}
      </select>

      <select class="btn btn-secondary dropdown-toggle filter-btn" data-toggle="dropdown" value={selectedDish} onChange={handleDishChange}>
        <option className='filter-opt' value="">All Dishes</option>
        {dish.map((dish) => (
          <option className='filter-opt' key={dish} value={dish}>
            {dish}
          </option>
        ))}
      </select>

      <button className='btn btn-danger' onClick={handleApply} >Apply</button>
      </div>
      </div>

        {loading && <Spinner />}
        

        <div className="recipe-container">
  {Array.isArray(list) && list.length > 0 ? (
    list.slice(0, 10).map((recipe) => {
        return <RecipeItem key={recipe.url} recipe={recipe.recipe} />;
    })
  ) : (
    <Failure search={search} loading={loading} />
  )}


</div>
{Array.isArray(list) && list.length > 0 &&
<Pages page={page} handleNext={handleNext} handlePrev={handlePrev} />}
    </>
  )
}
