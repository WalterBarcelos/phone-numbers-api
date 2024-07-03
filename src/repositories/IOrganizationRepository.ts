import { OrganizationDocument } from '../models/Organization';

export interface IOrganizationRepository {
  findAll(): Promise<OrganizationDocument[]>;
  findById(organizationId: string): Promise<OrganizationDocument| null>;
}