import Layout from "@/components/Layout"
import axios from "axios"
import { useState, useEffect } from "react"
import { withSwal } from "react-sweetalert2"


// Sweet alert 2 is a npm package that lets us create popups on the page and we inject the swal props into a functiional Categories component
const Categories = ({swal}) => {


  const [name, setName] = useState(null)
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
    const data = {
      name, 
      parentCategory, 
      // Properties are made up of property name and values 
      properties: properties.map(property => ({name: property.name, values: property.values.split(',')}))}
    
    // If we are editing we dont want to CREATE a new category, instead we just want to edit the existing one
    if (editedCategory){
      data._id = editedCategory._id // here we can add to data the id of the category we clicked to edit
      await axios.put('/api/categories', data) 
      setEditedCategory(null) // once we edited a category we want to reset the editedcategory so then the user can edit something else 
      
    } else{
      await axios.post('/api/categories', data) //make an axios request, passing in all the necessary data

    }
    // reset the inputs
    setName('')
    setParentCategory('')
    setProperties([])
    
    // Once the category is submitted we call getCategories so that the categories are updated
    getCategories()
  }

  // edit category handler that will run when we click on the edit button below
  const editCategory = (category) => {
    setEditedCategory(category)
    setName(category.name) // Prepopulate with the name and category IF it already has one (meaning if we are editing)
    setParentCategory(category.parentCategory?._id)
    // to avoid the error with "split" we need to separate the property name and values because its an array of objects
    setProperties(
      category.properties.map(({name, values}) => ({
        name, 
        values:values.join(',')
      })) 
    )
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

  // When a user types on the new property NAME input it will appear in the input
  const propertyNameChange = (index, property, newName) => {
    // console.log({index, property, newName}) // returns what is typed 

    setProperties(prev => {
      const properties = [...prev] // create a copy of the arrays current properties 
      properties[index].name = newName 
      return properties
    })
  }

  const propertyValueChange = (index, property, newValues) => {
    // console.log({index, property, newName}) // returns what is typed 

    setProperties(prev => {
      const properties = [...prev] // create a copy of the arrays properties 
      properties[index].values = newValues 
      return properties
    })
  }


  const removeProperty = (indexToRemove) => {
    setProperties(prev => {
      // the easiest way to delete a property is just by filtering them
      return [...prev].filter((property, propertyIndex) => {
        // return only properties that are NOT selected to be removed
        return propertyIndex !== indexToRemove
      })
    
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
                type='button' 
                onClick = {addProperty} // call to the function handler
                className='btn-default mb-2'>Add new property</button>
             
            </div>

          
          {properties.length > 0 && properties.map(
            // Sometimes properties might have the same name so we want to use the index as well
            (property,index) => (
              <div className="flex gap-1 mb-2">
                <input 
                  type='text' 
                  className="mb-0"
                  value = {property.name}
                  onChange={event => propertyNameChange(index, property, event.target.value)} 
                  placeholder = "Property Name (ex.:color)"
                  />
                <input 
                  type='text'
                  className="mb-0" 
                  value = {property.values} 
                  onChange={event => propertyValueChange(index, property, event.target.value)} // similar to the name change above but now we are doing it for values
                  placeholder = "Values"
                  />
                  <button
                    type='button' 
                    onClick = {() => removeProperty(index)} // call to the function handler
                    className='btn-default'>
                    Remove
                  </button>
              </div>
            
            )
          )}



          
          <div className ='flex gap-1'>
            <button type="submit" className="btn-primary py-1">Save</button>
            
            {editedCategory && (
              <button 
              type="button" 

              // Clicking the cancel button will reset the fields
              onClick = {() => {

                setEditedCategory(null)
                setName('')
                setParentCategory('')
                setProperties([])
              }}

              className="btn-default">Cancel</button>
            )}
          </div>
          
          
          
          
          
          
        </form>
        


        {!editedCategory && (
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
                  <td className="flex">
                    <button 
                      className="btn-primary mr-1 flex"
                      onClick={() => editCategory(category)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>

                    
                        
                        Edit</button>

                    <button 
                      className="btn-red flex"
                      onClick={() => deleteCategory(category)}
                      >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                      
                      
                      Delete</button>
                  </td>

                </tr>
              )
            )}
          </tbody>
        </table>
        )}
        
        
    </Layout>
  )
}




// Sweet alert 2 is a npm package that lets us create popups on the page
// Here we inject the swal props into a functional component with that component being Categories above
export default withSwal(({swal}, ref)=> (
  <Categories swal={swal}/>
))