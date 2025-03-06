import axios from 'axios';
import { Console } from 'console';
async function EnviarMensaje() {
    try{
        const response = await axios.post('http://localhost:8080/mensaje', {
            mensaje : 'Matricula = m041218',});
            console.log('HTTP Mensaje enviado: ', response.data);
    }
    catch(err){
        console.log('Error enviando mensaje', err);
    }
    
}

EnviarMensaje();
