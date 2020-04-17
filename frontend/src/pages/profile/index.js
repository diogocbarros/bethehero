import React, {useState, useEffect} from 'react';
import LogoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './style.css';
import api from '../../services/api';

export default function Profile(){
   
   const [incidents, setIncidents] = useState([])
   const ongName = localStorage.getItem('ongName');
   const ongId = localStorage.getItem('ongId');
   const history = useHistory();

   useEffect(() => {
      api.get('profile', {
         headers: {
            Authorization: ongId,
         }
      }).then( res => {
         setIncidents(res.data)
      })
   }, [ongId]);

   async function handleDelete(id) {
      try {
         await api.delete(`incidents/${id}`, {
            headers: {
               Authorization: ongId,
            }
         })
      } catch (error) {
         alert('Erro ao deletar caso, tente novamente');
      }
      setIncidents(incidents.filter(incident => incident.id !== id));
   }

   function handleLogout() {
      localStorage.clear();
      history.push('/')
   }

   return(
      <div className="profile-container">         
         
         <header>
            <img src={LogoImg} alt="Be the Hero"/>
            <div>Bem vindo {ongName}</div>

            <Link className="button" to="/incidents/new">
            Cadastrar novo caso
            </Link>
            <button onClick={handleLogout} type="button">
            <FiPower size={16} color="red"/>
            </button>
         </header>

         <h1>Casos cadastrados</h1>

         <ul>
            {incidents.map(incident => (
               <li key={incident.id}>
               <strong>CASO:</strong>
               <p>{incident.title}</p>
               
               <strong>DESCRIÇÃO:</strong>
               <p>{incident.description}</p>
               
               <strong>VALOR:</strong>
               <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value) }</p>

               <button onClick={() => handleDelete(incident.id)}> <FiTrash2 size={20}/> </button>
            </li>
            ))}
         </ul>
         


      </div>
   )
}