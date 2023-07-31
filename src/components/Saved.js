import React from 'react'
import { useLocation } from 'react-router-dom';
import RecipeItem from './RecipeItem'
import { motion } from "framer-motion";
import { portfolioAnimations } from "../animation"
export default function Saved() {
    const location = useLocation();
  const list = location.state && location.state.savedRecipes ? location.state.savedRecipes : [];
  console.log(list)


  return (
    <motion.div className="home"
      variants={portfolioAnimations}
      transition={{ delay: 0.3, duration: 0.6, type: "tween" }}
      >
    <div className="recipe-container">
          {Array.isArray(list) && list.length > 0 ? (list.map((recipe) => {
            return <RecipeItem  recipe={recipe}/>
          }) ): <h3 className="not-saved">No Saved Recipe</h3>
          }
        </div>
        </motion.div>
  )
}
