import Layout from "@/components/Layout"
import axios from "axios"
import { useState, useEffect } from "react"
const Categories = () => {


  const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  const [parentCategory, setParentCategory] = useState('')
  

  const getCategories = () => {
    axios.get('/api/categories').then(result =>{
      setCategories(result.data)
    })
  }
  

  // Create a save category handler function that will run on submit 
  const saveCategory = async(event) => {
    event.preventDefault()
    await axios.post('/api/categories', {name, parentCategory}) //make an axios request, passing in all the necessary data
    // Once the category is submitted we call getCategories so that the categories are updated
    getCategories()
  }


  // create a useeffect that will run and make an axios request to the categories endpoint
  useEffect(()=> {
      getCategories()
  }, [])


  return (
    <Layout>
        <h1>Categories</h1>

         {/* flex used to put input category name NEXT to a save button */}
        <form onSubmit={saveCategory} className="flex gap-1"> 
        {/* remove the slight margin at the bottom */}
          <input 
            className="mb-0" 
            type="text" 
            placeholder={'Category Name'}
            // set the name to event.target when the input is changed
            onChange = {event => setName(event.target.value)} 
            /> 

            {/* Select option to choose if parent or child category */}
            <select className="mb-0" 
                    onChange={event => setParentCategory(event.target.value)}
                    value={parentCategory}
                    >
              <option value="">No Parent Category</option>
              {/* Nice trick - instead of listing each category one by one for options, we can just use the map function here  */}
              {categories.length > 0 && categories.map(category =>(
                <option value={category._id}>{category.name}</option>
              )
            )}
            </select>



          <button type="submit" className="btn-primary py-1">Save</button>
        </form>

        <table className="basic mt-2">
          <thead>
            <tr>
              <td>
                Category Name
              </td>
            </tr>
          </thead>
          {/* Here we will show all the categories through map function*/}
          <tbody>

            {categories.length > 0 && categories.map(category =>(
                <tr> 
                  <td>{category.name}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        
    </Layout>
  )
}

export default Categories