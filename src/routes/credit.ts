import { Router } from 'express';
import { drawFromCreditLine } from '../services/creditService.js';

export const creditRouter = Router();

creditRouter.get('/lines', (_req, res) => {
  res.json({ creditLines: [] });
});

creditRouter.get('/lines/:id', (req, res) => {
  res.status(404).json({ error: 'Credit line not found', id: req.params.id });
});

creditRouter.post('/lines/:id/draw', (req, res) => {
  const { amount, borrowerId } = req.body;
  const id = req.params.id;

  try {
    const updated = drawFromCreditLine({
      id,
      borrowerId,
      amount,
    });

    res.status(200).json({
      message: 'Draw successful',
      creditLine: updated,
    });
  } catch (err: any) {
    switch (err.message) {
      case 'NOT_FOUND':
        return res.status(404).json({ error: 'Credit line not found' });
      case 'INVALID_STATUS':
        return res.status(400).json({ error: 'Credit line not active' });
      case 'UNAUTHORIZED':
        return res.status(403).json({ error: 'Unauthorized borrower' });
      case 'OVER_LIMIT':
        return res.status(400).json({ error: 'Amount exceeds credit limit' });
      case 'INVALID_AMOUNT':
        return res.status(400).json({ error: 'Invalid amount' });
      default:
        return res.status(500).json({ error: 'Internal server error' });
    }
  }
});