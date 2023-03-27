import React from 'react'
import { get, update } from 'lodash'
import Categories from './models/Categories.interface'

function HandleDropdownMenu(
  name: string,
  categoriesState: Categories,
  setCategoriesState: React.Dispatch<React.SetStateAction<Categories>>,
): void {
  get(categoriesState, `${name}`)
    ? update(categoriesState, `${name}`, () => false)
    : update(categoriesState, `${name}`, () => true)
  setCategoriesState((prevStateObj: Categories) => {
    return { ...prevStateObj }
  })
}

export default HandleDropdownMenu
