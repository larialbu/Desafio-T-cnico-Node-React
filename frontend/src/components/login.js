import styles1 from './login.module.css'
import { Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaFacebook, FaGoogle, FaGithub } from 'react-icons/fa' ;

function Login(){
    return(
        <div className={styles1.body}>
            <div className={styles1.container1}>
                <div className={styles1.loginForm1}>
                    <div className={styles1.title1}>Login</div>
                    <form action='#'>
                        <div className={styles1.inputBox1}>
                        <FaEnvelope className={styles1.icons1}/>
                        <input type="text" placeholder='Enter your email' required/>
                        </div>

                        <div className={styles1.inputBox1}>
                            <FaLock className={styles1.icons1}/>
                        <input type="password" placeholder='Enter your password' required/>
                        </div> 
                        <div className={styles1.fotgot1}></div>
                        <div className={styles1.inputBox1}>
                            {/* <input type="submit" vaule="Entrar" /> */}
                            <button><Link className={styles1.link1} to='./cadastro'>Entrar</Link></button>
                            
                        </div>
                        <div className={styles1.divider1}>ou</div>
                        <div className={styles1.medias1}>
                            <FaFacebook className={styles1.icons1}/>
                            <FaGoogle className={styles1.icons1}/>
                            <FaGithub className={styles1.icons1}/>
                        </div>
                        <div className={styles1.sigupText1}>
                            Não tenho uma conta? <Link to='./CadastroUsuario'>Crie uma agora</Link>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Login; 