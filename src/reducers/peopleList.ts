import { useEffect, useReducer } from 'react';
import {v4 as uuidv4 } from 'uuid';

type Person = {
  id: string,
  name: string,
}

type ActionsType = {
 type: 'ADD' | 'DEL' | 'ORDER',
 payload?: {
  name?: string,
  id?: string
 }
}

const initialPeoples: Person[] = [];

const functionReducer = (arrayPeoples: Person[], action: ActionsType) => {
  let newArrayPeople = [...arrayPeoples];

  switch(action.type) {
    case 'ADD': 
      if(action.payload?.name) {
        newArrayPeople.push({ id: uuidv4(), name: action.payload?.name })
        return newArrayPeople;
      }
    break;

    case 'DEL': 
      if(action.payload?.id) {
        // let newArrayPeople = [...arrayPeoples];
        newArrayPeople = newArrayPeople.filter(people => people.id !== action.payload?.id);
        return newArrayPeople;
      }
    break;

    case 'ORDER': 
      // let newArrayPeople = [...arrayPeoples];
      arrayPeoples = arrayPeoples.sort((atual, anterior) => atual.name > anterior.name ? 1 : -1);
      return newArrayPeople;
    break;
  }

  return newArrayPeople;
}

export const usePeopleList = () => {
  return useReducer(functionReducer, initialPeoples)
}