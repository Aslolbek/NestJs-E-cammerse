/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { extname } from 'path';

export const editedFileName = (req: any, file: any, callback: any) => {
  
  if (!file || !file.originalname) {
    return callback(new Error('Fayl yoki fayl nomi noto‘g‘ri!'), '');
  }

  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const fileExt = extname(file.originalname); 

  callback(null, `${file.fieldname}-${uniqueSuffix}${fileExt}`);
};