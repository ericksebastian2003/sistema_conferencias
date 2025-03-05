import mongoose from 'mongoose'
mongoose.set('strictQuery', true)


const connection = async () =>{
    try{
        const {connection} = await mongoose.connect(process.env.DT_URI_LOCAL)
        console.log(`base de datos conectado a ${connection.host} en el puerto ${connection.port}`)

    }catch (error){
        console.log(error)

    }
}

export default connection