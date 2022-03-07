import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Input from "../../components/Input";

const Edit = () => {
  const { id } = useParams();
  const [ dataApi, setDataApi ] = useState([]);
  const [ editName, setEditName ] = useState('');
  const [ editPrice, setEditPrice ] = useState(0);
  const [ editStock, setEditStock ] = useState(0);
  const [ editStatus, setEditStatus ] = useState(false);
  
  const getData = async () => {
    try {
      await axios
      .get(`http://localhost:3001/${id}`)
      .then((res) => {
        setDataApi(res.data[0]);
        console.log(res.data);
        setEditName(res.data.name)
        setEditPrice(res.data.price)
        setEditStock(res.data.stock)
        setEditStatus(res.data.status)
      })
    } catch (error) {
      console.log(error.message);
    }
  }
  
  useEffect(() => {
    getData();
  },[])
  
  //OnSubmit function
  const sendEdit = (e) => {
    // e.preventDefault();
    // axios.patch('http://localhost:3001/', { editName, editPrice, editStock, editStatus })

    console.log(`Data : ${editName}, ${editPrice}, ${editStock}, ${editStatus}`);
  }

  //OnChange functions
  const handleEditName = (e)=> {
    setEditName(e.target.value);
    console.log('Name :', editName);
  }

  const handleEditPrice = (e)=> {
    setEditPrice(e.target.value);
    console.log('Price :',editPrice);
  }

  const handleEditStock = (e)=> {
    setEditStock(e.target.value);
    console.log('Stock :',editStock);
  }

  const handleEditStatus = (e)=> {
    setEditStatus(e.target.checked);
    console.log('Status :',editStatus);
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={sendEdit}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={editName} onChange={handleEditName} />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={editPrice} onChange={handleEditPrice} />
          <Input name="stock" type="number" placeholder="Stock Produk..." label="Stock" value={editStock} onChange={handleEditStock} />
          <Input name="status" type="checkbox" label="Active" checked={editStatus} onChange={handleEditStatus} />
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;