import { Router } from 'express';
import { pingController, sendSMSController, sendEmailController } from '../controllers/mainController';
import { validateRequest } from '../middlewares/validateRequest';
import { smsSchema, emailSchema } from '../schemas/messageSchema';

const router = Router();

router.get('/ping', pingController);
router.post('/sms', validateRequest(smsSchema), sendSMSController);
router.post('/email', validateRequest(emailSchema), sendEmailController);

export default router;