import React, { useState } from 'react';
import './style.css';
import { Link, useHistory } from 'react-router-dom';
import logoimg from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';


export default function NewIncident(){

   const [title, settitle] = useState('');
   const [description, setdescription] = useState('');
   const [value, setvalue] = useState('');
   
   const ongId = localStorage.getItem('ongId');
   const history = useHistory();


   async function handleNewIncident(e) {
      e.preventDefault();

      const data = {
         title,
         description,
         value,
      };

      try {
         api.post('incidents',data, {
            headers: {
               Authorization: ongId,
            }
         })
         history.push('/profile');
      } catch (error) {
         alert('Erro ao cadastrar caso!')
      }
   }

   return(
      <div className="new-incident-container">
         <div className="content">
            
            <section>
               <img src={logoimg} alt="Be the Hero"/>               
               <h1>Cadastrar novo caso</h1>
               <p>Descreva o caso detalhadamente para encontrar um heroi para resolve-lo</p>
               
               <Link to={"/profile"} className="back-link"> 
               <FiArrowLeft size={16} color="#E02041" /> 
               Voltar
               </Link>
            </section>

            <form onSubmit={handleNewIncident}>
               <input 
                  placeholder="Titulo do caso"
                  value={title}
                  onChange={e => settitle(e.target.value)}
               />
               
               <textarea  
                  placeholder="Descrição"
                  value={description}
                  onChange={e => setdescription(e.target.value)}
               />
               
               <input 
                  placeholder="Valor em reais"
                  value={value}
                  onChange={e => setvalue(e.target.value)}
               />
               
               <button className="button" type="submit">Cadastrar</button>

            </form>
         </div>
      </div>
   )
}