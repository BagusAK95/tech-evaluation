import { Router } from "express";
import TransactionRouter from './transaction.js';
import KYC_API from './KYC.js'

const router = Router();

router.use('/transactions', TransactionRouter);
router.use('/kyc', KYC_API)

export default router;