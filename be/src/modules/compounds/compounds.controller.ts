import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CompoundsService } from './compounds.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCompoundDto } from './dtos/createCompoundDto';
import { Compound } from './schemas/compounds.schema';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';
import {
  imageFileFilter,
  MAX_FILE_SIZE,
} from '../../common/utils/multer.config';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('compounds')
@Controller('compounds')
export class CompoundsController {
  constructor(
    private readonly compoundsService: CompoundsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'masterPlan', maxCount: 1 },
        { name: 'images', maxCount: 10 },
      ],
      {
        limits: { fileSize: MAX_FILE_SIZE },
        fileFilter: imageFileFilter,
      },
    ),
  )
  @ApiOperation({ summary: 'Create a new compound' })
  @ApiResponse({
    status: 201,
    description: 'Compound created successfully.',
    type: Compound,
  })
  @ApiResponse({ status: 400, description: 'Missing required image(s).' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Req() req: RequestWithUser,
    @Body() compound: CreateCompoundDto,
    @UploadedFiles()
    files: {
      masterPlan: Express.Multer.File[];
      images: Express.Multer.File[];
    },
  ): Promise<Compound> {
    const masterPlanFile = files.masterPlan?.[0];
    const imageFiles = files.images;

    if (!masterPlanFile) {
      throw new BadRequestException('Master plan image is required.');
    }

    if (!imageFiles || imageFiles.length === 0) {
      throw new BadRequestException('At least one image is required.');
    }

    const uploadedMasterPlan = await this.cloudinaryService.uploadImage(
      masterPlanFile,
      'compounds',
    );
    const uploadedImages = await this.cloudinaryService.uploadImages(
      imageFiles,
      'compounds',
    );

    const uploadedImagesUrls: string[] = uploadedImages.map((img) => {
      return img.url;
    });

    const userId: string = req.user.userId!;
    return this.compoundsService.create(
      userId,
      compound,
      uploadedMasterPlan.url,
      uploadedImagesUrls,
    );
  }
}
