import { Controller, Get, Query } from '@nestjs/common';
import { VolumesService } from './volumes.service';

@Controller('volumes')
export class VolumesController {
  constructor(private readonly volumesService: VolumesService) {}

  @Get()
  findAll(@Query('issueId') issueId?: string) {
    return this.volumesService.findAll(issueId);
  }
}
