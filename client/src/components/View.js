import React from 'react'
import {Icon} from 'react-icons-kit'
import {trash} from 'react-icons-kit/feather/trash'

export const View = ({contacts,deleteContact}) => {
    
    return contacts.map(me=>(
        
        <tr key={me.isbn}>
            <td>{me.isbn}</td>
            <td>{me.title}</td>
            <td>{me.value}</td>
            <td className='delete-btn' onClick={()=>deleteContact(me.isbn)}>
                <Icon icon={trash}/>
            </td>           
        </tr>            
    
))
}