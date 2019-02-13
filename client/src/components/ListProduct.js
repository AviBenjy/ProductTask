import React, {useContext, useState} from 'react'
import styled from '@emotion/styled'
import moment from 'moment'

import {ContextProducts} from '../Context'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Modal from './Modal'


const ListProduct = ({products}) => {
  
  const {deleteProduct} = useContext(ContextProducts)
  
  const [modal, setModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(false)

  const handleDblClick = async (selectedProduct) => {
    setSelectedProduct(selectedProduct)
    setModal(true)
  }

  const rows = products.map((p) => (
    <TableRow  key={p.createdDate} onDoubleClick={() => handleDblClick(p)}> 
      <TableCell >{p.name}</TableCell>
      <TableCell align="center">{p.category}</TableCell>
      <TableCell align="center">{p.price}</TableCell>
      <TableCell align="center">{moment(p.createdDate).format('DD/MM/YYYY')}</TableCell>
      <TableCell><Icon onClick={() => deleteProduct(p)} className="far fa-trash-alt"/></TableCell>
    </TableRow>
  ))

  return (
    <Container>
      <Table >
        <TableHead>
          <TableRow >
            <TableCell>Name</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Created Date</TableCell>
            <TableCell align="right"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows}
        </TableBody>
      </Table>

      {modal && <Modal close={setModal} editProduct={selectedProduct}/>}
    </Container>
  )
}


export default ListProduct


const Container = styled.div`
  cursor: pointer;
`
const Icon = styled.i`
  &:hover {
    color: red;
  }
`
