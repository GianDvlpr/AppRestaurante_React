import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import { firebaseContext } from '../../firebase'
import Plato from '../ui/Plato';

const Menu = () => {

    const [platos, setPlatos] = useState([])

    const { firebase } = useContext(firebaseContext)

    useEffect(() => {
        const obtenerPlatos = () => {
            firebase.db.collection('productos').onSnapshot(handleSnapshot)
        }
        obtenerPlatos();
    }, [])

    //Snapshot permite usar la bd de firestore en tiempo real
    function handleSnapshot(snapshot) {
        const platos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });
        setPlatos(platos)
    }


    return (
        <>
            <h1 className="text-3xl font-light mb-4">Menú</h1>
            <Link to="/nuevo-plato" className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold">
                Agregar Plato
            </Link>

            {platos.map(plato => (
                <Plato
                    key={plato.id}
                    plato={plato}
                />
            ))}
        </>
    );
}

export default Menu;