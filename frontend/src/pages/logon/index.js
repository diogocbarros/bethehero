import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom'; 

import './styles.css';

import heroesimg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

export default function Logon() {

   const [id, setId] = useState('');
   const history = useHistory();

   async function handleId(e) {
      e.preventDefault();

      try {
         
         const res =  await api.post('sessions', {id})            

         localStorage.setItem('ongId',id);
         localStorage.setItem('ongName', res.data.name);

         history.push('/Profile');

      } catch (error) {
         alert('Id inexistente, falha ao entrar, tente novamente');         
      }
      
   }
   return(
      
      <div className="logon-container">
         <section className="form">
            <img src={logo} alt="Be the Hero"/>

            <form onSubmit={handleId}>
               <h1>Faça seu Logon</h1>
               
               <input 
                  placeholder="Sua ID"
                  value={id}
                  onChange={e => setId(e.target.value)}
               />
               
               <button className="button" type="submit">Entrar</button>

               <Link to="/register"> <FiLogIn size={16} color="#E02041"/> Nao tenho cadastro </Link>
            </form>
         </section>
         <img src={heroesimg} alt="Heroes"/>
      </div>
   )
}