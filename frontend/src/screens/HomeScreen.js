import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import {Route} from 'react-router-dom'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import SearchBox from '../components/SearchBox'
import {listProducts} from '../actions/productActions'

const HomeScreen = ({match}) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList) //works as usestate
  const {loading, error, products} = productList

  useEffect(() => {
    dispatch(listProducts(keyword)) //this fills our state
  }, [dispatch, keyword])

  return (
    <>
      <h1>Latest Products</h1>
      <Route render={({history}) => <SearchBox history={history}/>}/>
      {loading ? (
          <Loader />
          // <h2> Loading... </h2>
        ) : error ? (
          <Message>{error}</Message>
          // <h3>{error}</h3>
        ) : (
          <Row>
          {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4}>
                  <Product product={product}/> 
              </Col>
          ))}
          </Row>
        )
      }
      
    </> 
  )
}

export default HomeScreen
