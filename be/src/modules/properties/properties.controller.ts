import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { CloudinaryService } from '../../common/cloudinary/cloudinary.service';
import { imageFileFilter, MAX_FILE_SIZE } from '../../config/multer.config';
import { PropertiesService } from './properties.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreatePropertyDto } from './dtos/createPropertyDto';
import { Property, PropertyDocument } from './schemas/properties.schema';
import { GetPropertiesDto } from './dtos/getPropertiesDto';
import { GetPropertyDto } from './dtos/getPropertyDto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PropertyFilter } from './properties.interface';
import { DevelopersService } from '../developers/developers.service';
import { Types } from 'mongoose';

@ApiTags('properties')
@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly cloudinaryService: CloudinaryService,
    private developersService: DevelopersService,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'floorPlan', maxCount: 1 },
        { name: 'images', maxCount: 20 },
      ],
      {
        limits: { fileSize: MAX_FILE_SIZE },
        fileFilter: imageFileFilter,
      },
    ),
  )
  @ApiOperation({ summary: 'Create a new property' })
  @ApiResponse({ status: 201, description: 'Property created successfully.' })
  @ApiResponse({ status: 400, description: 'Missing required image(s).' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(
    @Req() req: RequestWithUser,
    @Body() property: CreatePropertyDto,
    @UploadedFiles()
    files: {
      floorPlan: Express.Multer.File[];
      images: Express.Multer.File[];
    },
  ): Promise<Property> {
    const floorPlanFile = files.floorPlan?.[0];
    const imageFiles = files.images;

    if (!floorPlanFile) {
      throw new BadRequestException('Floor plan image is required.');
    }
    if (!imageFiles || imageFiles.length === 0) {
      throw new BadRequestException('At least one image is required.');
    }

    const uploadedFloorPlan = await this.cloudinaryService.uploadImage(
      floorPlanFile,
      'properties',
    );
    const uploadedImages = await this.cloudinaryService.uploadImages(
      imageFiles,
      'properties',
    );

    const uploadedImagesUrls: string[] = uploadedImages.map((img) => {
      return img.url;
    });

    const userId: string = req.user.userId!;
    return this.propertiesService.create(
      userId,
      property,
      uploadedFloorPlan.url,
      uploadedImagesUrls,
    );
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all properties with pagination' })
  @ApiResponse({ status: 200, description: 'List of properties returned.' })
  async findAll(@Query() query: GetPropertiesDto): Promise<Property[]> {
    let filter: PropertyFilter = { isDeleted: false };
    if (query.type) filter.type = query.type;
    if (query.beds) {
      if (query.beds === 5) {
        filter.beds = { $gte: 5 };
      } else {
        filter.beds = query.beds;
      }
    }
    if (query.baths) {
      if (query.baths === 5) {
        filter.baths = { $gte: 5 };
      } else {
        filter.baths = query.baths;
      }
    }
    if (query.priceMin || query.priceMax) {
      filter.price = {};
      if (query.priceMin) filter.price.$gte = query.priceMin;
      if (query.priceMax) filter.price.$lte = query.priceMax;
    }
    if (query.developer) {
      const developer = (await this.developersService.getOne({
        name: query.developer,
        isDeleted: false,
      })) as { _id: Types.ObjectId };
      filter.developerId = developer._id;
    }

    return this.propertiesService.getMany(filter, '', query.page, query.limit, [
      { path: 'developerId', select: 'logo' },
    ]);
  }

  @Get('one/:id')
  @ApiOperation({ summary: 'Get single property by ID' })
  @ApiResponse({ status: 200, description: 'Property returned successfully.' })
  @ApiResponse({ status: 404, description: 'Property not found.' })
  async findOne(@Param() { id }: GetPropertyDto): Promise<Property> {
    return this.propertiesService.getOne({ _id: id, isDeleted: false }, '', [
      { path: 'developerId', select: 'logo' },
      { path: 'compoundId', select: 'name masterPlan' },
    ]);
  }
}
