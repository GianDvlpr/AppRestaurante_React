import React, { useContext, useState } from 'react';
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { firebaseContext } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import FileUploader from 'react-firebase-file-uploader'

const NuevoPlato = () => {

    //State para las imagenes
    const [upload, setUpload] = useState(false)
    const [progress, setProgress] = useState(0)
    const [urlImg, setUrlImg] = useState('')

    //Context con las operaciones de firebase
    const { firebase } = useContext(firebaseContext)
    // console.log(firebase);

    //Hook para redireccionar 
    const navigate = useNavigate();

    //Validar y lectura de los datos del formulario
    const formik = useFormik({
        initialValues: {
            nombre: '',
            precio: '',
            categoria: '',
            imagen: '',
            descripcion: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .min(3, 'Los platos deben de tener como minimo 3 carácteres')
                .required('El nombre del platillo es obligatorio'),
            precio: Yup.number()
                .min(1, 'Se debe de agregar un precio')
                .required('El precio es obligatorio'),
            categoria: Yup.string()
                .required('La categoria es obligatoria'),
            descripcion: Yup.string()
                .min(13, 'La descripción debe de tener como minimo 13 carácteres')
                .required('La descripción es obligatoria'),
        }),
        onSubmit: plato => {
            try {
                plato.existencia = true;
                plato.imagen = urlImg
                firebase.db.collection('productos').add(plato)
                navigate('/menu')
            } catch (error) {
                console.log(error)
            }
        }
    });

    //Funciones para las imagenes

    const handleUploadStart = () => {
        setProgress(0);
        setUpload(true);
    }

    const handleUploadError = error => {
        setUpload(false);
        console.log(error);
    }

    const handleUploadSuccess = async nombre => {
        setProgress(100);
        setUpload(false);

        //Almacenar la url de destino
        const url = await firebase
            .storage
            .ref("productos")
            .child(nombre)
            .getDownloadURL();

        console.log(url)
        setUrlImg(url);
    }

    const handleProgress = progress => {
        setProgress(progress);
        console.log(progress)

    }


    return (
        <>
            <h1 className="text-3xl font-light mb-4">Nuevo Plato</h1>

            <div className="flex justify-center mt-10">
                <div className="w-full max-w-3xl">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                            <input
                                id="nombre"
                                className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="Nombre Plato"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.nombre && formik.errors.nombre ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.nombre}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio</label>
                            <input
                                id="precio"
                                className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                placeholder="$10.00"
                                min="0"
                                value={formik.values.precio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.precio && formik.errors.precio ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.precio}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">Categoria</label>
                            <select
                                id="categoria"
                                name="categoria"
                                className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={formik.values.categoria}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">-- Seleccione --</option>
                                <option value="desayuno">Desayuno</option>
                                <option value="almuerzo">Almuerzo</option>
                                <option value="cena">Cena</option>
                                <option value="bebidas">Bebidas</option>
                                <option value="postre">Postre</option>
                                <option value="ensaladas">Ensaladas</option>
                            </select>
                        </div>

                        {formik.touched.categoria && formik.errors.categoria ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.categoria}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">Imagen</label>
                            <FileUploader
                                accept="image/*"
                                id="imagen"
                                name="imagen"
                                randomizeFilename
                                storageRef={firebase.storage.ref("productos")}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
                            />
                        </div>

                        {upload && (
                            <div className="h-12 relative w-full border">
                                <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{width: `${progress}%`}}>
                                    {progress}%
                                </div>
                            </div>
                        )}

                        {urlImg && (
                            <p className="bg-green-500 text-white p-3 text-center my-5">La imagen se subió correctamente</p>
                        )}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripción</label>
                            <textarea
                                id="descripcion"
                                className="shadow appareance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                                type="text"
                                placeholder="Descripción del plato"
                                value={formik.values.descripcion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></textarea>
                        </div>

                        {formik.touched.descripcion && formik.errors.descripcion ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.descripcion}</p>
                            </div>
                        ) : null}

                        <input
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                            value="Agregar Plato"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default NuevoPlato;