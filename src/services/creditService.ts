import { creditLines } from '../models/creditLineStore.js';

interface DrawRequest {
     id: string;
     borrowerId: string;
     amount: number;
}

export function drawFromCreditLine({
     id,
     borrowerId,
     amount,
}: DrawRequest) {
     const line = creditLines.find((l) => l.id === id);

     if (!line) {
          throw new Error('NOT_FOUND');
     }

     if (line.status !== 'Active') {
          throw new Error('INVALID_STATUS');
     }

     if (line.borrowerId !== borrowerId) {
          throw new Error('UNAUTHORIZED');
     }

     if (amount <= 0) {
          throw new Error('INVALID_AMOUNT');
     }

     if (line.utilized + amount > line.limit) {
          throw new Error('OVER_LIMIT');
     }

     line.utilized += amount;

     return line;
}