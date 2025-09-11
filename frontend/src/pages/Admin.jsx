import { useEffect, useState } from 'react'
import ProjectForm from "../components/ProjectForm"
import LoginForm from "../components/LoginForm"

const Admin = () => {

  const [user, setUser] = useState(null)

  return (
    <div>
      {!user &&
        <LoginForm setUser={setUser} />
      }
      {user &&
        <ProjectForm />
      }
    </div>
  )
}

export default Admin