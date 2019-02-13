import React, {useState, useContext} from 'react'
import styled from '@emotion/styled'
import {TextField, NativeSelect} from '@material-ui/core'
import ProductValidator from '../validators/productValidator'
import {ContextProducts} from '../Context'
import moment from 'moment'


const Modal = ({close, editProduct}) => {
  
  const {updateProducts, categories} = useContext(ContextProducts)
  
  const initialProduct = {name: '', price: 1, category: categories[0]}
  
  const [product, setProduct] = useState(editProduct || initialProduct)
  
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {  
    const {name, value} = e.target
    const copyProduct = {...product, [name]: value}

    if(name === 'price' && value) {
      copyProduct.price = isNaN(value) ? value : +value
    }

    const valid = ProductValidator[name].validate(copyProduct[name], {
      verbose: true // make valid returning true if vaild otherwise error message
    })
    
    errors[name] = (valid === true) ? undefined : valid
    
    setProduct({...copyProduct})   
    setErrors(errors)     
  }

  const handleSubmit = () => {
    
    const error = ProductValidator.validate(product)
    
    if(!editProduct) {
      product.createdDate = moment(new Date()).valueOf() 
    }
    
    error ? setErrors(error) : updateProducts(product)
    
    if(editProduct) close()

    setProduct(initialProduct)
  }

  const options = categories.map(category => <option key={category}>{category}</option>)
  
  return (
    <Container>
      <Content>
        <Title>{editProduct ? 'Edit' : 'Add new'} product</Title>

        <TextField
          value={product.name}
          label="Name"
          name="name"
          onChange={handleChange}
          fullWidth
          variant="outlined"
          error={errors.name !== undefined}
          helperText={errors.name}
          style={{margin: 6}}
          autoFocus
        />

        <TextField
          value={product.price}
          label="Price"
          name="price"
          onChange={handleChange}
          fullWidth
          variant="outlined"
          error={errors.price !== undefined}
          helperText={errors.price}
          style={{margin: 6}}
        />

        <NativeSelect
          value={product.category}
          name="category"
          onChange={handleChange}
          fullWidth
          style={{margin: 6}}>

          {options}
        </NativeSelect>

        <Btn onClick={() => close()}>Close</Btn>
        <Btn onClick={handleSubmit} go> Go! </Btn>
      </Content>
    </Container>
  )
}


export default Modal



const Container = styled.div`
  display: block; 
  position: fixed; 
  z-index: 1; 
  left: 0;
  top: 0;
  width: 100%; 
  height: 100%; 
  overflow: auto; 
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4); 
`

const Content = styled.div`
  background-color: #fefefe;
  margin: 15% auto; 
  padding: 20px;
  border: 1px solid #888;
  width: 80%; 
`

const Title = styled.h3`
  margin: 8px 8px 16px 8px;
`

const Btn = styled.button`
  margin: 16px;
  background-color: white; 
  border: 2px solid ${p => p.go ? 'green' : '#ba000d'};
  color: ${p => p.go ? 'green' : '#ba000d'};
  padding: 10px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 4px;
  font-size: 16px;
  box-shadow: 1px 2px 6px #888888;
  transition: 0.6s all;
  cursor: pointer;
  &:hover {
    background-color: ${p => p.go ? 'green' : '#ba000d'}; 
    color: white;
  }
`
