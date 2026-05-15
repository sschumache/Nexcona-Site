// src/api/team-member/services/team-member.ts
import { factories } from '@strapi/strapi';

export default factories.createCoreService(
  'api::team-member.team-member' as any
);
