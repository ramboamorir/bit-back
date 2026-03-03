const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const userBank = [
    {
        id: 1,
        name: "Gerardo Bernal",
        age: 19,
        bankName: "Banco Occidente",
        count: 500000,
    },
    {
        id: 2,
        name: "Camilo Contreras",
        age: 40,
        bankName: "Banco Caja Social",
        count: 700000,
    },
    
];

app.get('/bancoUsuario',(request, response)=>{
    response.send(userBank)
})

app.post('/bancoUsuario',(request, response)=>{
    const {name, age, bankName, count} = request.body;
    if (!name || age === undefined || !bankName || count === undefined) {
        response.send({message : "Debe ingresar los valores respectivos"});
    }
    const newUserBank ={
        id: userBank.length +1,
        name,
        age,
        bankName,
        count,
    };
    userBank.push(newUserBank);
    response.status(200).json({message: "Usuario agregado"});
})

app.put('/bancoUsuario/:id',(request, response)=>{
    const id = parseInt(request.params.id);

    const userBankIndex = userBank.findIndex(p => p.id === id)

    if (userBankIndex !== -1) {
        const {name, age, bankName, count} = request.body;
        if (!name || age === undefined || !bankName || count === undefined) {
            return response.status(404).json({message: 'Falta campo obligatorio'});
        }
        const updateUser = {
          id,
          name,
          age,
          bankName,
          count,
        };
        userBank[userBankIndex] = updateUser
        response.status(200).json(updateUser)
    } else {
        response.status(404).json({message : "Usuario Bancario no encontrado"})
    }
})

app.delete('/bancoUsuario/:id',(request,response)=>{
    const id = parseInt(request.params.id);
    const userBankIndex = userBank.findIndex((p)=> p.id === id);
    if (userBankIndex !== -1) {
        userBank.splice(userBankIndex, 1)
        response.status(200).json({message : 'Usuario Eliminado Eliminado'});
        //response.status(204).send() //El codigo 204 lo que se encarga de no enviar un mensaje sino da una confirmación
    }else{
        response.status(404).json({message : 'Usuario Eliminado no encontrado'});
    }
})


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});