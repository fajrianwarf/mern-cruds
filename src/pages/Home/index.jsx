import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './index.scss';
import axios from 'axios';

const Home = () => {
  
  const [ productList, setProductList ] = useState([]);

  const getData = async () => {
    try {
      await axios
        .get('http://localhost:3001/')
        .then((res) => {
          setProductList(res.data);
          console.log(res.data);
        })
    } catch (error) {
      console.log(error.message);
    }
  }
  
  useEffect(() => {
    getData();
  },[])

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
    getData();
  }

  return(
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" placeholder="Masukan kata kunci..."/>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            productList.map( (list, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{list.name}</td>
                  <td className="text-right">
                    { new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(list.price)}
                  </td>
                  <td className="text-center">
                    <Link to={`/detail/${list._id}`} className="btn btn-sm btn-info" >Detail</Link>
                    <Link to={`/edit/${list._id}`} className="btn btn-sm btn-warning" >Edit</Link>
                    <Link to="" className="btn btn-sm btn-danger" onClick={ () => deleteProduct(list._id)}>Delete</Link>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default Home;