import {  CATEGORY_URL, BASE_URL  } from "./config.js";


async function getCateg(){
    try {
        const res = await  fetch(CATEGORY_URL.GET)
        if(!res.ok){
            throw new Error(`request xetasi: xeta bas verdi status: ${res.status}`);
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
        
    }
}

async function getProductByCat(ctg) {
    try {
        const res = await  fetch( `${BASE_URL.GET}/${ctg}`)
        if(!res.ok){
            throw new Error(`request xetasi: xeta bas verdi status: ${res.status}`);
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
        
    }
}

async function deleteProductByid(ctg, id) {
    try {
        const res = await  fetch( `${BASE_URL.DELETE}/${ctg}/${id}`,{
            method: 'DELETE'
        })
        if(!res.ok){
            throw new Error(`request xetasi: xeta bas verdi status: ${res.status}`);
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
        
    }
}

async function postNewPizzas(meat, ctg) {
    try {
        const res = await fetch(`${BASE_URL.POST}/${ctg}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meat)
        });

        if (!res.ok) throw new Error("Something went wrong!");

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Post error:", error);
    }
}

async function editPizzas(meat, ctg , id) {
    try {
        const res = await fetch(`${BASE_URL.PUT}/${ctg}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(meat)
        });

        if (!res.ok) throw new Error("Something went wrong!");

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Post error:", error);
    }
}




export{
    getCateg,
    getProductByCat,
    deleteProductByid,
    postNewPizzas,
    editPizzas
}