import Layout from "@/components/Layout"
import axios from "axios"
import { useState, useEffect } from "react"
import { withSwal } from "react-sweetalert2"


// Sweet alert 2 is a npm package that lets us create popups on the page and we inject the swal props into a functiional Categories component
const Categories = ({swal}) => {


  const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  const [parentCategory, setParentCategory] = useState(null)
  const [editedCategory, setEditedCategory] = useState(null)
  const [properties, setProperties] = useState([])

  const getCategories = () => {
    axios.get('/api/categories').then(result =>{
      setCategories(result.data)
    })
  }
  

  // Create a save category handler function that will run on submit 
  const saveCategory = async(event) => {
    event.preventDefault()
    const data = {name, parentCategory}
    
    // If we are editing we dont want to CREATE a new category, instead we just want to edit the existing one
    if (editedCategory){
      data._id = editedCategory._id // here we can add to data the id of the category we clicked to edit
      await axios.put('/api/categories', data) 
      setEditedCategory(null) // once we edited a category we want to reset the editedcategory so then the user can edit something else 
    } else{
      await axios.post('/api/categories', data) //make an axios request, passing in all the necessary data
    }
    
    // Once the category is submitted we call getCategories so that the categories are updated
    getCategories()
  }

  // edit category handler that will run when we click on the edit button below
  const editCategory = (category) => {
    setEditedCategory(category)
    setName(category.name) // Prepopulate with the name and category IF it already has one (meaning if we are editing)
    setParentCategory(category.parentCategory?._id)
  }


  // delete category handler will use swal from react-sweetalert 2 to create a popup
  const deleteCategory = (category) => {
    // Code syntax provided in documentation
    swal.fire({
      title: 'Confirm to delete category?',
      text: `Delete ${category.name}?`,
      showCancelButton:true, 
      cancelButtonTitle: 'Cancel',
      confirmButtonText: 'DELETE!',
      confirmButtonColor: '#FF0000'
    }).then(async result => {
      //console.log({result}) // result gives us {isConfirmed: true, isDenied: false, isDismissed: false, value: true}
      // we can use the properties of result --> if isConfirmed is true that means we want to delete
      if (result.isConfirmed){
        const {_id} = category // from category we can extract the id
        await axios.delete('/api/categories?_id='+_id) // here we make a request to the end point and then add a query to delete by the id
        getCategories() // update the categories
      }
    })
  }


  // pretty much when we add property we take what was added originally and then add to it 
  const addProperty = () => {
    setProperties(prev => {
      return[...prev, {name:'', values:''}] // name and values start off as empty strings
    })
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
        <form onSubmit={saveCategory} > 
        

          {/* by adding the input isnde a div we are able to push the save button onto a new line */}
          <div className="flex gap-1"> 
          <input 
            //remove the slight margin at the bottom
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

            </div>

            <div className='mb-2'> 
              {/* block will make the element take its own line */}
              <label className="block">Properties</label>
              
              <button 
                type='submit' 
                onClick = {addProperty} // call to the function handler
                className='btn-default'>Add new property</button>
            </div>

          <button type="submit" className="btn-primary py-1">Save</button>
          {properties.length > 0 && properties.map(
            property => (
              <div className="flex gap-1">
                <input type='text' placeholder = "Property Name (ex.:color)"/>
                <input type='text' placeholder = "Values"/>
              </div>
            )
          )}
          
          
          
          
          
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

                    <button 
                      className="btn-primary"
                      onClick={() => deleteCategory(category)}
                      >
                   
                      
                      
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




// Sweet alert 2 is a npm package that lets us create popups on the page
// Here we inject the swal props into a functional component with that component being Categories above
export default withSwal(({swal}, ref)=> (
  <Categories swal={swal}/>
))