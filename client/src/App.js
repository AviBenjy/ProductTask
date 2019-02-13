import React, { Component } from 'react'
import styled from '@emotion/styled'
import ControlPanel from './components/ControlPanel'
import ListProduct from './components/ListProduct'
import {ContextProducts} from './Context'
import api from './api'



class App extends Component {

  state = {
    products: [],
    search: '',
    sortBy: 'createdDate',
    categories: []
  }

  async componentDidMount() {
    const products = JSON.parse(localStorage.getItem('products')) || []
    const categories = await api.getCategories()
    this.setState({products, categories})
  }

  // Add new or edit exist one
  updateProducts = async (product) => {  
    const item = this.state.products.find(p => p.createdDate === product.createdDate)
    const copyList = [...this.state.products]

    if(!item) copyList.push(product)
    else {
      const itemCopy = {item, ...product}
      copyList[this.state.products.indexOf(item)] = itemCopy
    }

    await this.setState({products: copyList})
    this.updateLocalStorage()
  }

  deleteProduct = async (product) => {
    const index = this.state.products.indexOf(product)
    const products = [...this.state.products]

    products.splice(index, 1)
    await this.setState({products})
    this.updateLocalStorage()
  }

  searchProduct = (search='') => {
    this.setState({search})
  }

  sortList = (sortBy) => {
    this.setState({sortBy})
  }

  updateLocalStorage = () => {
    localStorage.setItem('products', JSON.stringify(this.state.products))    
  }

  action = {
    updateProducts: this.updateProducts,
    deleteProduct: this.deleteProduct,
    sortList: this.sortList,
    searchProduct: this.searchProduct
  }

  render() {
    const {products, search, sortBy} = this.state
    const list = products.filter(p => p.name.toLowerCase().includes(search)).sort((a, b) => a[sortBy] - b[sortBy])
    return (
      <Container>
        <Title>Products</Title>

        <ContextProducts.Provider value={{...this.action, ...this.state}}>
          <ControlPanel/>
          <ListProduct products={list}/>
        </ContextProducts.Provider>

      </Container>
    );
  }
}

export default App



const Container = styled.div`
width: 90%;
height: 650px;
margin: 20px auto;
border-radius: 20px;
border: solid 1px #1c313a;
overflow: hidden;
background: #fff;
box-shadow: 0 0 0px 1px rgba(255,255,255,.4),
            0 0 0px 3px #2c3033;
`

const Title = styled.h2`
  display: block;
  text-align: center;
  padding: 20px;
  background: #0031ca;
  color: #fff;
`