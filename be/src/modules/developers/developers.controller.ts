// Nest
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

// Lib
import { imageFileFilter, MAX_FILE_SIZE } from '../../config/multer.config';

// Services
import { DevelopersService } from './developers.service';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';

// Guard
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Schemas
import { Developer } from './schemas/developers.schema';

// Dtos
import { CreateDeveloperDto } from './dtos/createDeveloperDto';
import { GetDevelopersDto } from './dtos/getDevelopersDto';

// Interfaces
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';

@ApiTags('developers')
@Controller('developers')
export class DevelopersController {
  constructor(
    private readonly developersService: DevelopersService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('create')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('logo', {
      limits: { fileSize: MAX_FILE_SIZE },
      fileFilter: imageFileFilter,
    }),
  )
  @ApiOperation({ summary: 'Create a new developer' })
  @ApiResponse({
    status: 201,
    description: 'Developer created successfully.',
    type: Developer,
  })
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

  @Get('all')
  @ApiOperation({ summary: 'Get all developers with pagination' })
  @ApiResponse({
    status: 200,
    description: 'List of developers returned.',
    type: [Developer],
  })
  async findAll(@Query() query: GetDevelopersDto): Promise<Developer[]> {
    return this.developersService.getMany(
      { isDeleted: false },
      query.selections,
    );
  }
}
