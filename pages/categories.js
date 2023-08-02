import Layout from "@/components/Layout"
import axios from "axios"
import { useState, useEffect } from "react"
const Categories = () => {


  const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  const [parentCategory, setParentCategory] = useState('')
  const [editedCategory, setEditedCategory] = useState(null)

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

  // edit category handler that will run when we click on the edit button below
  const editCategory = (category) => {
    console.log(category)
    setEditedCategory(category)
    // Prepopulate with the name and category IF it has one (meaning if we are editing)
    setName(category.name)
    setParentCategory(category.parentCategory?._id)
  }


  // create a useeffect that will run and make an axios request to the categories endpoint
  useEffect(()=> {
      getCategories()
  }, [])


  return (
    <Layout>
        <h1>Categories</h1>

          {/* change the label based on whether we have a category or not */}
          <label>
            {editedCategory 
            ? `Edit Category ${editedCategory.name}`
            : 'Create New Category'}
          </label>





         {/* flex used to put input category name NEXT to a save button */}
        <form onSubmit={saveCategory} className="flex gap-1"> 
        {/* remove the slight margin at the bottom */}
          <input 
            className="mb-0" 
            type="text" 
            placeholder={'Category Name'}
            // set the name to event.target when the input is changed
            onChange = {event => setName(event.target.value)} 
            value ={name}
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
              <td>Category Name</td>
              <td>Parent Category</td>
            </tr>
          </thead>
          {/* Here we will show all the categories through map function*/}
          <tbody>

            {categories.length > 0 && categories.map(category =>(
                <tr> 
                  <td>{category.name}</td>
                  {/* some categories might not have a parent thats why we have the ?*/}
                  <td>{category?.parentCategory?.name}</td>
                  <td>
                    <button 
                      className="btn-primary mr-1"
                      onClick={() => editCategory(category)}
                      >
                    
                        
                        Edit</button>

                    <button className="btn-primary">
                   
                      
                      
                      Delete</button>
                  </td>

                </tr>
              )
            )}
          </tbody>
        </table>
        
    </Layout>
  )
}

export default Categories