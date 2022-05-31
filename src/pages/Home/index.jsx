import React, {useState, useEffect} from 'react'
import './styles.css'

import {Card} from "../../components/Card";

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''})
  const input = document.querySelector('input')

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
    setStudents(prevState =>[...prevState, newStudent]);
    console.log(input)
    input.reset()
  }

  useEffect(() => {
    fetch('https://api.github.com/users/ValdineiJunior').then(response => response.json().then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })

    }))
  }, [students])

  function pressEnterKey (k) {
    if(k.key == "Enter") {
      handleAddStudent()
    }
  }
  
  return ( 
    <div className='container'>
      <header>
      <h1>Lista de Presença</h1>
      <div>
      <strong>{user.name}</strong>
      <img src={user.avatar} alt="Foto de perfil" />
      </div>
      </header>
      <input
      type="text"
      placeholder="Digite o nome..."
      onChange={e => setStudentName( e.target.value)}
      onKeyDown={k => pressEnterKey(k)}
      />
      <button type="button" onClick={handleAddStudent}>Adcionar</button>

      {/* a key usada aqui não é ideal, como ela precisa ser unica, e estamos usando o time, caso adcionamos dois nomes no mesmo segundo, a chave sera duplicada, aparecendo o erro no console. */}

      {
        students.map(student => <Card key={student.time} name={student.name} time= {student.time} />)
      }
    </div>
   )
}
