import { UUID } from 'crypto';
import mongoose, { Schema, model, Document } from 'mongoose';

mongoose.connect('mongodb://root:example@localhost:27017/admin')
  .then(() => console.log('Conectado ao Banco de Dados!'))
  .catch(error => {
    console.log('ERRO:::', error)
  })

interface Logs extends Document {
    serverID: UUID;
    clientID: string;
    message: string;
    type: string;
    priority: string;
    timestamp: number;
}

const limitSchema = new Schema({
    serverID: { type: String, required: true },
    clientID: { type: String, required: true, index: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
    priority: { type: String, required: true },
    timestamp: { type: Number, required: true },
});

export const LimitModel = model<Logs>('Logs', limitSchema);