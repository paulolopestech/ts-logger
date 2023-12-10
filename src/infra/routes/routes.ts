import { Request, Response, Router } from 'express';
import { HandleLogger } from '../../controllers/handle.logger';
import { LoggerService } from '../../services';
import { LoggerAdapter } from '../config/database';

const router = Router();

router.get('/get-logs', async (req: Request, res: Response) => {
    const filters: any = req.query.filters;
    const page: any = req.query?.page;
    const adapter = new LoggerAdapter();
    const service = new LoggerService(adapter);
    const controller = new HandleLogger(service);
    const response = await controller.handleGetLogs(filters, page);
    res.send(response);
});


export default router;