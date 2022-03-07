import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import './index.scss';

const Detail = () => {
  const { id } = useParams();
  const [ dataApi, setDataApi ] = useState([]);

  const getData = useCallback(async () => {
    try {
      await axios
      .get(`http://localhost:3001/${id}`)
      .then((res) => {
        setDataApi(res.data[0]);
        console.log(res.data[0]);
      })
    } catch (error) {
      console.log(error.message);
    }
  },[id])
  
  useEffect(() => {
    getData();
  },[getData])

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>

      <table className="table">
        <tbody>
          <tr>
            <td>ID</td>
            <td>{dataApi._id}</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>{dataApi.name}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>{dataApi.price}</td>
          </tr>
          <tr>
            <td>Stock</td>
            <td>{dataApi.stock}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{dataApi.status ? 'ada' : 'kosong'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;