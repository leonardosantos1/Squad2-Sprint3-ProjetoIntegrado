import {Request, Response, NextFunction} from 'express'
import camelCaseKeys from 'camelcase-keys'

    export const camelCase = ()=>{
        return function (req : Request, res : Response, next : NextFunction) {
            req.body = camelCaseKeys(req.body, { deep: true })
            req.params = camelCaseKeys(req.params)
            req.query = camelCaseKeys(req.query)
            next()
        }
    }


