import React, {useState} from 'react'
import Dialog from './Dialog';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { getFirestore, collection, doc, setDoc,  arrayUnion, updateDoc, arrayRemove } from "firebase/firestore";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from "framer-motion";
import { portfolioAnimations } from "../animation"
import { useScroll } from "./useScroll"



export default function RecipeItem(props) {
  const [element, controls] = useScroll();
  const location = useLocation();
  const [user] = useAuthState(auth);
  const [showShare, setShowShare] = useState(false);
    const [Open, setOpen] = useState(false)
    let {recipe} = props;
    const navigate = useNavigate()
    console.log(recipe)
    const handleOpen = () => {
        setOpen(!Open)
    }
    const handleShowShare = () => {
      setShowShare(!showShare)
    };

    const handleShare = () => {
      if (navigator.share) {
        navigator.share({
          title: recipe.label,
          url: recipe.url,
        })
          .then(() => console.log('Shared successfully'))
          .catch((error) => console.error('Error sharing:', error));
      } else {
        console.log('Web Share API not supported');
      }
    };

    const handleWish = async () => {
      console.log("wish");
      if (user) {
        const userId = user.uid;
        const userRef = doc(db, "users", userId);
        console.log(userRef)
        await setDoc(userRef, {
          uid:user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
          wishlist: arrayUnion(recipe)
        });
        toast.success('Recipe Saved', {
          position: toast.POSITION.TOP_RIGHT
      });
      } else {
        toast.warn('You have to Login to save recipes', {
          position: toast.POSITION.TOP_RIGHT
      });
        navigate('/login')
        console.log("User not logged in.");
      }
    }
    const handleNotWish = async () => {
      console.log("wish");
      if (user) {
        const userId = user.uid;
        const userRef = doc(db, "users", userId);
        console.log(userRef)
        await updateDoc(userRef, {
          uid:user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
          wishlist: arrayRemove(recipe)
        });
        toast.warn('Recipe removed from saved', {
          position: toast.POSITION.TOP_RIGHT
      });
        window.location.reload();

      } else {
        toast.warn('You have to Login to save recipes', {
          position: toast.POSITION.TOP_RIGHT
      });
        navigate('/login')
        console.log("User not logged in.");
      }
    }

  return (
    <>
    <div className="rec" ref={element} >

    
    <motion.div className="home"
      variants={portfolioAnimations}
      animate={controls}
      transition={{ delay: 0.3, duration: 0.6, type: "tween" }}
      >
        <div className="recipe" onMouseEnter={handleShowShare} onMouseLeave={handleShowShare} >
            <img src={recipe.image } alt=""  />  
            <span className="dishName">{recipe.label.slice(0,35)}</span>
              <div className="btn1">
                <div className="ing" onClick={() => handleOpen()}>Ingredients</div>
                <span className="see" onClick={() => window.open(recipe.url)}>See Recipe</span>
              </div>
              <div className="btn1">
                <div className="ing2" onClick={handleShare} >Share</div>
                {location.pathname === '/savedpage' ? (
                <div className="see2" onClick={handleNotWish}>
                  Remove Saved
                </div>
                ) : <div className="see2" onClick={handleWish}>
                Add to Saved
                </div> }
              </div>
            
            
            
        </div>

        {Open &&  <>
            <Dialog recipe={recipe} />
        </>
        }

    </motion.div>
    </div>
    </>
  )
}
