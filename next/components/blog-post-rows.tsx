'use client';

import { format } from 'date-fns';
import FuzzySearch from 'fuzzy-search';
import { Link } from 'next-view-transitions';
import React, { useEffect, useState } from 'react';

import { truncate } from '@/lib/utils';
import { Article } from '@/types/types';

export const BlogPostRows = ({
  articles,
  locale,
}: {
  articles: Article[];
  locale: string;
}) => {
  const [search, setSearch] = useState('');

  const searcher = new FuzzySearch(articles, ['title'], {
    caseSensitive: false,
  });

  const [results, setResults] = useState(articles);

  useEffect(() => {
    const results = searcher.search(search);
    setResults(results);
  }, [search, articles]);

  return (
    <div className="w-full py-20">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-2xl font-bold text-[#2B2B2B]">More Posts</p>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search articles"
          className="min-w-full rounded-md border border-[#E2E2E2] bg-white p-2 text-sm text-[#2B2B2B] placeholder-[#999999] outline-none transition focus:border-[#003F6B] sm:min-w-96"
        />
      </div>

      <div className="divide-y divide-[#E2E2E2]">
        {results.length === 0 ? (
          <p className="p-4 text-center text-[#666666]">No results found</p>
        ) : (
          results.map((article, index) => (
            <BlogPostRow
              article={article}
              key={article.slug + index}
              locale={locale}
            />
          ))
        )}
      </div>
    </div>
  );
};

export const BlogPostRow = ({
  article,
  locale,
}: {
  article: Article;
  locale: string;
}) => {
  return (
    <Link
      href={`/${locale}/blog/${article.slug}`}
      className="group flex flex-col items-start justify-between py-4 transition hover:bg-[#F8F9FA] md:flex-row md:items-center md:px-2 md:rounded-xl"
    >
      <div>
        <p className="text-lg font-medium text-[#2B2B2B] transition group-hover:text-[#003F6B]">
          {article.title}
        </p>

        <p className="mt-2 max-w-xl text-sm text-[#666666]">
          {truncate(article.description, 80)}
        </p>

        <div className="my-4 flex items-center gap-2">
          <p className="text-sm text-[#666666]">
            {format(new Date(article.publishedAt), 'MMMM dd, yyyy')}
          </p>

          <div className="h-1 w-1 rounded-full bg-[#306B8C]" />

          <div className="flex flex-wrap gap-2">
            {article.categories?.map((category, idx) => (
              <p
                key={`category-${idx}`}
                className="rounded-full bg-[#003F6B]/10 px-2 py-1 text-xs font-semibold capitalize text-[#003F6B]"
              >
                {category.name}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};