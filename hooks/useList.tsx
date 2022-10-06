import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import React, {useState, useEffect} from 'react'
import { db } from '../firebase'
import { Movie } from '../typing'

function useList(uid : string | undefined) {

    const [list, setlist] = useState<DocumentData[] | Movie[]>([])

    useEffect(() => {
        if(!uid) return

        return onSnapshot(
            collection(db, "customers", uid, "mylist"),
            (snapshot) => {
                setlist(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })))
            }
        )


    }, [uid, db ])
    

  return list
}

export default useList