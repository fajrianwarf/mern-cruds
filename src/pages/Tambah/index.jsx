
import { useState } from 'react';
import axios from 'axios';
import './index.scss';
import Input from '../../components/Input';

const Tambah = () => {  
  const [ addName, setAddName ] = useState('');
  const [ addPrice, setAddPrice ] = useState(0);
  const [ addStock, setAddStock ] = useState(0);
  const [ addStatus, setAddStatus ] = useState(false);
  
  //OnSubmit function
  const sendAdd = async () => {
    // e.preventDefault();
    try {
      await axios.post('http://localhost:3001/tambah', { addName, addPrice, addStock, addStatus });
    } catch (error) {
      console.log(error);
    }

    console.log(`Data : ${addName}, ${addPrice}, ${addStock}, ${addStatus}`);//trial
  }

  //OnChange functions
  const handleAddName = (e)=> {
    setAddName(e.target.value);
    // console.log('Name :', addName);
  }

  const handleAddPrice = (e)=> {
    setAddPrice(e.target.value);
    // console.log('Price :',addPrice);
  }

  const handleAddStock = (e)=> {
    setAddStock(e.target.value);
    // console.log('Stock :',addStock);
  }

  const handleAddStatus = (e)=> {
    setAddStatus(e.target.checked);
    // console.log('Status :',addStatus);
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        <form action='' onSubmit={sendAdd}>
          <Input name="name" type="text" placeholder="Nama Produk..." label="Nama" value={addName} onChange={handleAddName} />
          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={addPrice} onChange={handleAddPrice} />
          <Input name="Stock" type="number" placeholder="Stock Produk..." label="Stock" value={addStock} onChange={handleAddStock} />
          <Input name="status" type="checkbox" label="Active" checked={addStatus} onChange={handleAddStatus} />
          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;