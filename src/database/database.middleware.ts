

import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class DatabaseMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const { clientInfo } = req.body;
    req.clientData = clientInfo;
    next();
  }
}
