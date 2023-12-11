import 'dotenv/config'
import { UUID } from 'crypto';
import mongoose, { Schema, model, Document } from 'mongoose';

const mongoHost = process.env.MONGO ? process.env.MONGO : 'localhost'
mongoose.connect(`mongodb://root:example@${mongoHost}:27017/admin`)
  .then(() => console.log('Conectado ao Banco de Dados!'))
  .catch(error => {
    console.log('ERRO:::', error)
  })

interface Logs extends Document {
    connectionID: UUID;
    applicationID: string;
    message: string;
    type: string;
    priority: number;
    timestamp: number;
}

const logsSchema = new Schema({
    connectionID: { type: String, required: true },
    applicationID: { type: String, required: true, index: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
    priority: { type: Number, required: true },
    timestamp: { type: Number, required: true },
});

export const LogsModel = model<Logs>('Logs', logsSchema);