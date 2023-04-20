import app from "./firebase";
import {
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    getAuth,
    signOut,
    updateProfile,
    sendEmailVerification
} from 'firebase/auth';
import {
    collection,
    getFirestore,
    doc, 
    setDoc
} from "firebase/firestore";

export const signin = async (email, password) => {

    let user = null;
    let error = null;

    try {
        const auth = getAuth(app);
        user = await signInWithEmailAndPassword(auth, email, password);
    } catch(e) {
        error = e;
    }
    

    return { user, error };
}

export const signout = async () => {
    let error = null;

    try {
        await signOut(getAuth(app))
    } catch (e) {
        error = e;
    }
    console.log(error)

    return { error };
}

export const signup = async (displayName, email, password) => {
    let user = null
    let error = null

    try {
        const auth = getAuth(app);
        const db = getFirestore(app);

        const credential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        user = credential.user;

        await updateProfile(user, {
            displayName
        })

        await sendEmailVerification(user);

        const userRef = collection(db, "user")
    
        await setDoc(doc(userRef, credential.user.uid))
    } catch (e) {
        error = e 
    }

    return { user, error };
}