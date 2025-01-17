'use client';

import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { useCallback } from 'react';
import { IconType } from 'react-icons';
import queryString from 'query-string';

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    ///defined empty query

    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    /// add category
    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    //check if new category is already selected and removed from updatequery car second click doit etre diseable
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    const url = queryString.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <div
      onClick={handleClick}
      className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer ${
        selected
          ? 'border-b-neutral-800'
          : 'border-transparent'
      } ${
        selected ? 'text-neutral-800' : 'text-neutral-500'
      } `}
    >
      <Icon size={26} />
      <div className="font-meduim text-sm">{label}</div>
    </div>
  );
};

export default CategoryBox;
