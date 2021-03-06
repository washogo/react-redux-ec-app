import { signInAction, signOutAction } from "./actions";
import { push } from "connected-react-router";
import { auth, db, FirebaseTimestamp } from "../../firebase/index";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const listenAuthState = () => {
  return async (dispatch) => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        getDoc(doc(db, "users", `${uid}`)).then((snapshot) => {
          const data = snapshot.data;

          dispatch(
            signInAction({
              isSignedIn: true,
              role: data.role,
              uid: uid,
              username: data.username,
            })
          );
          
        });
      } else {
        dispatch(push("/signin"));
      }
    });
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    // Validation
    if (email === "" || password === "") {
      alert("必須項目が未入力です");
      return false;
    }

    signInWithEmailAndPassword(auth, email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;

        getDoc(doc(db, "users", `${uid}`)).then((snapshot) => {
          const data = snapshot.data;

          dispatch(
            signInAction({
              isSignedIn: true,
              role: data.role,
              uid: uid,
              username: data.username,
            })
          );

          dispatch(push("/"));
        });
      }
    });
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    // Validation
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("必須項目が未入力です");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致しません。もう１度お試しください。");
      return false;
    }

    return createUserWithEmailAndPassword(auth, email, password).then(
      (result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp;

          const userInitialData = {
            createdAt: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updatedAt: timestamp,
            username: username,
          };

          setDoc(doc(db, "users", `${uid}`), userInitialData).then(() => {
            dispatch(push("/"));
          });
        }
      }
    );
  };
};

export const signOuter = () => {
  return async (dispatch) => {
    signOut(auth).then(() => {
      dispatch(signOutAction());
      dispatch(push("/signin"));
    });
  };
};

export const resetPassword = (email) => {
  return async (dispatch) => {
    if (email === "") {
      alert("必須項目が未入力です")
      return false;
    } else {
      sendPasswordResetEmail(auth, email).then(() => {
          alert("入力されたアドレスにパスワードリセット用のメールをお送りしました。")
          dispatch(push("/signin"))
      }).catch(() => {
        alert("パスワードリセットに失敗しました。")
      })
    }
  }
}
