import { DocumentData } from "firebase/firestore";
import { atom } from "recoil";
import { Movie } from "../typing";


export const modalState = atom({
    key: 'modalState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });

  export const movieState = atom<Movie | DocumentData | null>({
    key: 'movieState',
    default: null,
  })