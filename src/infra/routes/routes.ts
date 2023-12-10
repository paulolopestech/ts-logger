import { Request, Response, Router } from 'express';

const router = Router();

router.get('/get-logs', (req: Request, res: Response) => {
    const webHookData = req.body;
  
    console.log('Dados do webhook recebidos:', webHookData);
  
    res.status(200).send('Webhook recebido com sucesso!');
});


export default router;