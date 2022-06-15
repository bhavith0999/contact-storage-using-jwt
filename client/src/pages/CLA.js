import React,{useState, useEffect} from 'react'
import { View } from '../components/View';
import PhoneInput from 'react-phone-number-input'
import ContactInput from '../components/ContactInput';

// getting the values of local storage
const getDatafromLS=()=>{
  const data = localStorage.getItem('contacts');
  if(data){
    return JSON.parse(data);
  }
  else{
    return []
  }
}

export const CLA = () => {

  const [contacts, setContacts]=useState(getDatafromLS());

  // input field states
  const [title, setTitle]=useState('');
  const [isbn, setIsbn]=useState('');
  const [value, setValue] = useState()


  // form submit event
  const handleAddContactSubmit=(e)=>{
    e.preventDefault();
    // creating an object
    let contact={
      title,
      value,
      isbn
    }
    setContacts([...contacts,contact]);
    setTitle('');
    setValue('');
    setIsbn('');
  }

  const deleteContact=(isbn)=>{
    const filteredBooks=contacts.filter((element,index)=>{
      return element.isbn !== isbn
    })
    setContacts(filteredBooks);
  }

  // saving data to local storage
  useEffect(()=>{
    localStorage.setItem('contacts',JSON.stringify(contacts));
  },[contacts])

  return (
    <div className='wrapper'>
      <h1>ContactList App</h1>
      <p>Add and view your contacts using local storage</p>
      <div className='main'>

        <div className='form-container'>
          <form autoComplete="off" className='form-group'
          onSubmit={handleAddContactSubmit}>
            <label>Title</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setTitle(e.target.value)} value={title}></input>
            <br></br>
            <label>Contact</label>
            <input type="number" className='form-control' required
            onChange={(e)=>setValue(e.target.value)} value={value}></input>
            <br></br>
            <label>ISBN#</label>
            <input type="text" className='form-control' required
            onChange={(e)=>setIsbn(e.target.value)} value={isbn}></input>
            <br></br>
            <button type="submit" className='btn btn-success btn-md'>
              ADD
            </button>
          </form>
        </div>

        <div className='view-container'>
          {contacts.length>0&&<>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>ISBN#</th>
                    <th>Title</th>
                    <th>Contact</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  <View contacts={contacts} deleteContact={deleteContact}/>
                </tbody>
              </table>
            </div>
            <button className='btn btn-danger btn-md'
            onClick={()=>setContacts([])}>Remove All</button>
          </>}
          {contacts.length < 1 && <div>No contacts are added yet</div>}
        </div>

      </div>
    </div>
  )
}

export default CLA;