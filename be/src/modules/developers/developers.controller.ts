import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DevelopersService } from './developers.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateDeveloperDto } from './dtos/createDeveloperDto';
import { Developer } from './schemas/developers.schema';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';
import {
  imageFileFilter,
  MAX_FILE_SIZE,
} from '../../common/utils/multer.config';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('developers')
@Controller('developers')
export class DevelopersController {
  constructor(
    private readonly developersService: DevelopersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('logo', {
      limits: { fileSize: MAX_FILE_SIZE },
      fileFilter: imageFileFilter,
    }),
  )
  @ApiOperation({ summary: 'Create a new developer' })
  @ApiResponse({ status: 201, description: 'Developer created successfully.' })
  @ApiResponse({ status: 400, description: 'Logo image is required.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async create(
    @Req() req: RequestWithUser,
    @Body() developer: CreateDeveloperDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Developer> {
    if (!file) {
      throw new BadRequestException('Logo image is required');
    }

    const uploadedImage = await this.cloudinaryService.uploadImage(
      file,
      'developers',
    );

    const userId: string = req.user.userId!;
    return this.developersService.create(userId, developer, uploadedImage.url);
  }
}
