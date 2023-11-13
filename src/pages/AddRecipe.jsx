import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { doc, getDoc,setDoc } from "firebase/firestore";
import { auth, provider, db } from "../Firebase/Firebase";

function AddRecipe() {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [instructions, setInstructions] = useState("");
    const [ingredients, setIngredients] = useState("");

    const generateRandomUID = () => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let randomUID = "";
        for (let i = 0; i < 10; i++) {
            randomUID += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return randomUID;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const recipeData = {
            name,
            image,
            instructions,
            ingredients,
        };
        const userDocRef = doc(db, "user", localStorage.getItem("email"));
        const userDocSnapshot = await getDoc(userDocRef);

        const randomUID = generateRandomUID();
        console.log("alhfjkhldfkasdhfkl")

        const user = auth.currentUser; // Use auth.currentUser instead of firebase.auth().currentUser
        console.log(user)

        // Add the user's information, including the random UID, to the recipe data
        recipeData.author = user;
        recipeData.uid = randomUID;

        // Insert the data into Firestore and generate a unique ID
        const docRef = await setDoc(userDocSnapshot, {
            ...recipeData,
            timestamp: Timestamp.now(),
        });

        console.log("Recipe added with ID: ", docRef.id);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Enter recipe name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>Enter recipe image URL:
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </label>
                <label>Enter recipe instructions:
                    <textarea
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        required
                    />
                </label>
                <label>Enter recipe ingredients:
                    <textarea
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    />
                </label>
                <input type="submit" value="Add Recipe" />
            </form>
        </div>
    )
}

export default AddRecipe;
