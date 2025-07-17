const products= [
    { id: 1, nombre: "Resistencia 220Ω", precio: 5, categoria: ["resistencia", "carbono"] },
    { id: 2, nombre: "Condensador cerámico 100nF", precio: 8, categoria: ["capacitor", "cerámico"] },
    { id: 3, nombre: "Inductor 10µH", precio: 12, categoria: ["inductor", "bobina"] },
    { id: 4, nombre: "Diodo 1N4007", precio: 3, categoria: ["diodo", "rectificador"] },
    { id: 5, nombre: "Transistor BC547", precio: 6, categoria: ["transistor", "NPN"] },
    { id: 6, nombre: "Potenciómetro 10kΩ", precio: 10, categoria: ["resistencia", "variable"] },
    { id: 7, nombre: "Condensador electrolítico 470µF", precio: 15, categoria: ["capacitor", "electrolítico"] },
    { id: 8, nombre: "LED rojo 5mm", precio: 4, categoria: ["diodo", "emisor de luz"] },
    { id: 9, nombre: "Cristal de cuarzo 16MHz", precio: 9, categoria: ["oscilador", "cuarzo"] },
    { id: 10, nombre: "Interruptor táctil", precio: 7, categoria: ["interruptor", "momentáneo"] }
  ];

import { db } from "./firebase.js";

import {collection, getDocs } from "firebase/firestore";

const productsCollection = collection(db,"products");



export const getAllProducts=async()=>{
  
    try {
      const snapshot =await getDocs(productsCollection);
      return snapshot.docs.map((doc)=>({id:doc.id, ...doc.data()}));
      
    } catch (error) {
      console.error(error);
      
    };
}

export const productsById=(id)=>{
   return products.find((item)=>item.id==id);
    
}