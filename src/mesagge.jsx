import React,{forwardRef} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import './Mesagge.css'
/*Legga el objeto completo message y llega username */
 const Mesagge = forwardRef(({message,username}, ref) => {
    /*Si username es igual en valor y tipo de dato al valor user
     del objeto message retorna verdadero y se almacena en isUser */
    const isUser = username === message.user;
    return (
        /*El usuario actual verá su mensaje a la derecha por los estilod messa */
        <div ref = {ref} className={`message ${isUser && 'message_user'}`}>
           <Card className={isUser ? "message_userCard" :"message_guestCard"}>
                <CardContent className="text-message">
                    {/*No necesitamos ver nuestro username solo de los demás */}
                    {!isUser && `${message.user || 'Usuario desconocido'  }: `}  {message.text} 
                </CardContent>
            </Card>
        </div>

    )
})
export default Mesagge