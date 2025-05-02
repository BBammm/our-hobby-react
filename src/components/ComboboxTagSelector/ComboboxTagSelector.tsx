'use client'

import { Combobox } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { getTags, createTag } from '@/lib/api/tagService'

interface Tag {
  _id: string
  name: string
}

interface Props {
  value: Tag | null
  onChange: (tag: Tag) => void
}

export default function ComboboxTagSelector({ value, onChange }: Props) {
  const [query, setQuery] = useState('')
  const [options, setOptions] = useState<Tag[]>([])


  useEffect(() => {
    const fetchTags = async () => {
      const results = await getTags(query)
      setOptions(results)
    }

    if (query.length > 0) {
      fetchTags()
    } else {
      setOptions([])
    }
  }, [query])

  const handleSelect = async (selected: Tag | string | null) => {
    console.log('[선택됨]', selected)
    if (!selected) return
    if (typeof selected === 'string') {
      const newTag = await createTag(selected)
      if (newTag) onChange(newTag)
    } else {
      onChange(selected)
    }
  }

  const filtered = query && !options.some((opt) => opt.name === query)
    ? [...options, { _id: 'new', name: query }]
    : options

  return (
    <Combobox value={value} onChange={handleSelect}>
      <div className="relative">
        <Combobox.Input
          onChange={(e) => setQuery(e.target.value)}
          displayValue={(tag: Tag) => tag?.name || ''}
          className="w-full border border-gray-300 rounded px-3 py-2 text-gray-900 placeholder-gray-500"
          placeholder="태그를 입력하세요 (예: 등산)"
        />
        <Combobox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-md">
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500">결과 없음</div>
          ) : (
            filtered.map((tag) => (
              <Combobox.Option
                key={tag._id}
                value={tag._id === 'new' ? tag.name : tag}  // 👈 이 부분이 핵심!!
                className={({ active }) =>
                  `px-3 py-2 text-sm cursor-pointer ${
                    active ? 'bg-blue-600 text-white' : 'text-gray-800'
                  }`
                }
              >
                {tag._id === 'new' ? `+ 새 태그 "${tag.name}" 생성` : tag.name}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  )
}