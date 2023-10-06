// LocalStorage.js

// Almacena datos en el Local Storage de manera segura
export const storeDataLocally = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Error al almacenar datos en el Local Storage:", error);
  }
};

// Recupera datos almacenados en el Local Storage
export const retrieveDataLocally = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error al recuperar datos del Local Storage:", error);
    return null;
  }
};

export const retrieveDataLocallyRow = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? data : null;
  } catch (error) {
    console.error("Error al recuperar datos del Local Storage:", error);
  }
};
