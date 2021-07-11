import {Router} from 'express'
const router = Router()
import resolveipController from '../controllers/resolveipController'

router.get('/', resolveipController.listarItens)

export default router