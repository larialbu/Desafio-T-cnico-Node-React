import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styles1 from './login.module.css'
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock} from 'react-icons/fa' ;

const Login = ({ getUsuario, onEdit, setOnEdit }) => {
    const ref = useRef();
  
    useEffect(() => {
      if (onEdit) {
        const usuario = ref.current;
  
        usuario.email.value = onEdit.email;
        usuario.senha.value = onEdit.senha;
  
        
      }
    }, [onEdit]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const usuario = ref.current;
      console.log(usuario?.currentTarget?.elements)
  
      if (
        !usuario.email.value ||
        !usuario.senha.value 
        
      ) {
        return toast.warn("Preencha todos os campos!");
      }
  
      if (onEdit) {
        console.log("edit",usuario)
        await axios
          .put("http://localhost:8080/" + onEdit.id, {
            email: usuario.email.value,
            senha: usuario.senha.value,
            
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      } else {
        console.log("create",usuario)
        await axios
          .post("http://localhost:8080", {
            email: usuario.email.value,
            senha: usuario.senha.value,

            
          })
          .then(({ data }) => toast.success(data))
          .catch(({ data }) => toast.error(data));
      }
  
      usuario.email.value = "";
      usuario.senha.value = "";
  
      setOnEdit(null);
      getUsuario();
    };

    return(
        <div className={styles1.body}>
            <div className={styles1.container1}>
                <div className={styles1.loginForm1}>
                    <div className={styles1.title1}>Login</div>
                    <form action='#' ref={ref} onSubmit={handleSubmit}>
                        <div className={styles1.inputBox1}>
                        <FaEnvelope className={styles1.icons1}/>
                        <input name="email" type="text" placeholder='Enter your email' required/>
                        </div>

                        <div className={styles1.inputBox1}>
                            <FaLock className={styles1.icons1}/>
                        <input name="senha" type="password" placeholder='Enter your password' required/>
                        </div> 
                        <div className={styles1.fotgot1}></div>
                        <div className={styles1.inputBox1}>
                            {/* <input type="submit" vaule="Entrar" /> */}
                            <button type="submit"><Link className={styles1.link1} to='./cadastro'>Entrar</Link></button>
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}



export default Login; 