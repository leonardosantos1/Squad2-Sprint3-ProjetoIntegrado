import {Router} from 'express'
const router = Router()
import resolveIpController from '../controllers/resolveipController'

router.get('/', resolveIpController.listarItens)

export default router