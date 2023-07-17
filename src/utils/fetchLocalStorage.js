//buscar informacion del usuario en el almacenamiento local
export const fetchUser = () => {
  const userInfo =
    //obtener cadena JSON almaenada prev bajo la clave 'user' en el almacenamiento del navegador local y verificar si es distinta a undefined
    localStorage.getItem("userActual") !== "undefined"
      ? //convertir de vuelta a un obj de js
        JSON.parse(localStorage.getItem("userActual"))
      : // si no existe se llama al metodo para borrar los datos de almacenamiento local
        localStorage.clear();

  return userInfo;
};