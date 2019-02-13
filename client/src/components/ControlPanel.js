import React, {useContext, useState} from 'react'
import styled from '@emotion/styled'
import {ContextProducts} from '../Context'
import Modal from './Modal'


const ControlPanel = (props) => {
  const [modal, setModal] = useState(false)
  const {searchProduct, sortList} = useContext(ContextProducts)
  
  return (
    <Container>
      <Btn onClick={()=> setModal(true)} >Add</Btn>
      
      <SearchField onChange={e => searchProduct(e.target.value.toLowerCase())} placeholder='Search by name'/>
      
      <SortBy>
      Sort by
      <Select onChange={e => sortList(e.target.value)}>
        <option value='createdDate'>Created Date</option> 
        <option value='price'>Price</option>
      </Select>
      </SortBy>

      {modal && <Modal close={setModal}/>}

    </Container>
  )
}


export default ControlPanel


const margin = '8px'

const Container = styled.div`
  background: #3d5afe;
  display: flex;
  justify-content: center;
`

const SearchField = styled.input`
  margin: ${margin};
  border-radius: 6px;
  border: none;
  text-indent: 4px
`

const SortBy = styled.div`
  font-size: 0.8em;
  margin: ${margin};
`

const Select = styled.select`
  margin: 4px;
`

const Btn = styled.button`
  margin: ${margin};
  background-color: white; 
  border: 2px solid #ba000d;
  color: #ba000d;
  padding: 6px 22px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 4px;
  font-size: 14px;
  box-shadow: 1px 2px 6px #888888;
  transition: 0.6s all;
  cursor: pointer;
  &:hover {
    background-color: #ba000d; 
    color: white;
  }
`
