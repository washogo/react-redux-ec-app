import { push } from "connected-react-router";
import { collection, doc, setDoc } from "firebase/firestore";
import { db, FirebaseTimestamp } from "../../firebase";

export const saveProducts = (name, description, category, gender, price, images) => {
  return async (dispatch) => {
    const timestamp = FirebaseTimestamp;

    const data = {
      category: category,
      description: description,
      gender: gender,
      images: images,
      name: name,
      price: parseInt(price, 10),
      updated_at: timestamp,
    };

    const ref = doc(collection(db, "products"));
    const id = ref.id;
    data.id = id;
    data.created_at = timestamp;

    return setDoc(doc(db, "products", id), data)
      .then(() => {
        dispatch(push("/"));
      })
      .catch((error) => {
        throw new Error(error);
      });
  };
};
