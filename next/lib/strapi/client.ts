import { strapi } from '@strapi/client';
import type { API, Config } from '@strapi/client';
import { cacheLife, cacheTag, revalidateTag } from 'next/cache';
import { draftMode } from 'next/headers';
import { API_URL } from '../utils';

export class StrapiError extends Error {
  constructor(
    message: string,
    public readonly contentType: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'StrapiError';
  }
}

const createClient = (
  config?: Omit<Config, 'baseURL'>,
  isDraftMode: boolean = false
) => {
  return strapi({
    baseURL: `${API_URL}/api`,
    headers: {
      'strapi-encode-source-maps': isDraftMode ? 'true' : 'false',
      ...config?.headers,
    },
    ...config,
  });
};

async function fetchCollectionCached<T = API.Document[]>(
  collectionName: string,
  options?: API.BaseQueryParams,
  config?: Omit<Config, 'baseURL'>
): Promise<T> {
  'use cache';
  cacheLife('minutes');
  cacheTag(`collection-${collectionName}`);

  const { data } = await createClient(config)
    .collection(collectionName)
    .find({
      ...options,
      status: 'published',
    });

  return data as T;
}

export async function fetchCollectionType<T = API.Document[]>(
  collectionName: string,
  options?: API.BaseQueryParams,
  config?: Omit<Config, 'baseURL'>
): Promise<T> {
  const { isEnabled: isDraftMode } = await draftMode();

  try {
    if (isDraftMode) {
      const { data } = await createClient(config, true)
        .collection(collectionName)
        .find({
          ...options,
          status: 'draft',
        });

      return data as T;
    }

    if (process.env.ENVIRONMENT === 'development') {
      const { data } = await createClient(config)
        .collection(collectionName)
        .find({
          ...options,
          status: 'published',
        });

      return data as T;
    }

    return fetchCollectionCached<T>(collectionName, options, config);
  } catch (error) {
    throw new StrapiError(
      `Failed to fetch collection "${collectionName}"`,
      collectionName,
      error
    );
  }
}

async function fetchSingleCached<T = API.Document>(
  singleTypeName: string,
  options?: API.BaseQueryParams,
  config?: Omit<Config, 'baseURL'>
): Promise<T> {
  'use cache';
  cacheLife('minutes');
  cacheTag(`single-${singleTypeName}`);

  const { data } = await createClient(config)
    .single(singleTypeName)
    .find({
      ...options,
      status: 'published',
    });

  return data as T;
}

export async function fetchSingleType<T = API.Document>(
  singleTypeName: string,
  options?: API.BaseQueryParams,
  config?: Omit<Config, 'baseURL'>
): Promise<T> {
  const { isEnabled: isDraftMode } = await draftMode();

  try {
    if (isDraftMode) {
      const { data } = await createClient(config, true)
        .single(singleTypeName)
        .find({
          ...options,
          status: 'draft',
        });

      return data as T;
    }

    if (process.env.ENVIRONMENT === 'development') {
      const { data } = await createClient(config)
        .single(singleTypeName)
        .find({
          ...options,
          status: 'published',
        });

      return data as T;
    }

    return fetchSingleCached<T>(singleTypeName, options, config);
  } catch (error) {
    throw new StrapiError(
      `Failed to fetch single type "${singleTypeName}"`,
      singleTypeName,
      error
    );
  }
}

async function fetchDocumentCached<T = API.Document>(
  collectionName: string,
  documentId: string,
  options?: API.BaseQueryParams,
  config?: Omit<Config, 'baseURL'>
): Promise<T> {
  'use cache';
  cacheLife('minutes');
  cacheTag(`document-${collectionName}-${documentId}`);

  const { data } = await createClient(config)
    .collection(collectionName)
    .findOne(documentId, {
      ...options,
      status: 'published',
    });

  return data as T;
}

export async function fetchDocument<T = API.Document>(
  collectionName: string,
  documentId: string,
  options?: API.BaseQueryParams,
  config?: Omit<Config, 'baseURL'>
): Promise<T> {
  const { isEnabled: isDraftMode } = await draftMode();

  try {
    if (isDraftMode) {
      const { data } = await createClient(config, true)
        .collection(collectionName)
        .findOne(documentId, {
          ...options,
          status: 'draft',
        });

      return data as T;
    }

    if (process.env.ENVIRONMENT === 'development') {
      const { data } = await createClient(config)
        .collection(collectionName)
        .findOne(documentId, {
          ...options,
          status: 'published',
        });

      return data as T;
    }

    return fetchDocumentCached<T>(collectionName, documentId, options, config);
  } catch (error) {
    throw new StrapiError(
      `Failed to fetch document "${documentId}" from "${collectionName}"`,
      collectionName,
      error
    );
  }
}

export function revalidateContent(
  type: 'collection' | 'single' | 'document',
  contentType: string,
  documentId?: string
): void {
  switch (type) {
    case 'collection':
      revalidateTag(`collection-${contentType}`, 'max');
      break;
    case 'single':
      revalidateTag(`single-${contentType}`, 'max');
      break;
    case 'document':
      if (documentId) {
        revalidateTag(`document-${contentType}-${documentId}`, 'max');
      }
      break;
  }
}