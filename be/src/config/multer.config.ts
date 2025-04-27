import { BadRequestException } from '@nestjs/common';

export const imageFileFilter = (req, file, cb) => {
  if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
    return cb(new BadRequestException('Only image files are allowed!'), false);
  }
  cb(null, true);
};

export const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
