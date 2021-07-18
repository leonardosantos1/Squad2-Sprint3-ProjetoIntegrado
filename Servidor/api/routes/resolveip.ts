import {Router} from 'express'
const router = Router()
import resolveIpController from '../controllers/ResolveIpController'

router.get('/', resolveIpController.listarItens)

export default router