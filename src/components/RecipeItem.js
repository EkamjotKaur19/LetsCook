import React, {useState} from 'react'
import Dialog from './Dialog';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { getFirestore, collection, doc, setDoc,  arrayUnion, updateDoc, arrayRemove } from "firebase/firestore";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom';


export default function RecipeItem(props) {
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
        alert("Recipe added to  Saved!");
      } else {
        alert('You have to LogIn to save Favourite recipes')
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
        alert("Recipe removed from Saved!");
        window.location.reload();

      } else {
        alert('You have to LogIn to save Favourite recipes')
        navigate('/login')
        console.log("User not logged in.");
      }
    }

  return (
    <>
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


    </>
  )
}
