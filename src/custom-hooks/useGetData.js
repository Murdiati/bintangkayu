import { useEffect, useState } from 'react';
import { db } from '../firebase.config';
import { collection, onSnapshot, Timestamp } from 'firebase/firestore';


const useGetData = (collectionName) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const collectionRef = collection(db, collectionName);

    useEffect(() => {
        const getData = async () => {

            // ========== Firebase firestore realtime data update ===============
            await onSnapshot(collectionRef, (snapshot) => {
                let docDatas = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
                if (collectionName === "Pesanan") {
                    setData(
                        docDatas.sort(
                            (data, sortParam) => (
                                (data.tanggalPemesanan.seconds > sortParam.tanggalPemesanan.seconds) ? -1 :
                                    (
                                        (sortParam.tanggalPemesanan.seconds > data.tanggalPemesanan.seconds) ? 1 :
                                            0
                                    )
                            )
                        )
                    );
                }
                else {
                    setData(docDatas)
                }
                setLoading(false);

            });

            // const data = await getDocs(collectionRef);
            // setData(data.docs.map(doc=>({...doc.data(), id: doc.id})));
            // setLoading(false);
        }

        getData();
    }, []);

    // console.log("isi state data = ", data)

    return { data, loading };
};

export default useGetData;