import { IOrganizationRepository } from '../IOrganizationRepository';
import Organization, { OrganizationDocument } from '../../models/Organization';

export class OrganizationRepository implements IOrganizationRepository {
  async findAll(): Promise<OrganizationDocument[]> {
    return Organization.find({}).exec();
  }
  
  async findById(organizationId: string): Promise<OrganizationDocument | null> {
    return Organization.findById(organizationId).exec();
  }
}