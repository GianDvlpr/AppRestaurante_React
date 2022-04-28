import React, { useState, useContext } from 'react'
import { firebaseContext } from '../../firebase'
const Orden = ({ orden }) => {

    const { firebase } = useContext(firebaseContext)

    const [tiempoEntrega, setTiempoEntrega] = useState(0)

    //Definiendo el tiempo de entrega
    const definirTiempo = (id) => {
        try {
            firebase.db.collection('ordenes').doc(id).update({ tiempoEntrega })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="p-3 shadow-md bg-white">
                <h1 className="text-yellow-600 text-lg font-bold ">{orden.id}</h1>
                {orden.orden.map(platos => (
                    <p className="text-gray-600">{platos.cantidad} {platos.nombre}</p>
                ))}

                <p className="text-gray-700 font-bold ">Total a Pagar: S/ {orden.total}.00</p>
                {orden.tiempoentrega === 0 && (
                    <div className="mb-4">
                        <label className="text-gray-700 block text-sm font-bold mb-2">
                            Tiempo de Entrega
                        </label>
                        <input
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            min="1"
                            max="30"
                            placeholder="15"
                            value={tiempoEntrega}
                            onChange={e => setTiempoEntrega(parseInt(e.target.value))}
                        />
                        <button
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                            onClick={() => definirTiempo(orden.id)}
                        >
                            Definir Tiempo
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Orden;