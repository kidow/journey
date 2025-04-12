'use client'

import type { Editor } from '@tiptap/core'
import Placeholder from '@tiptap/extension-placeholder'
import { EditorContent, useEditor } from '@tiptap/react'
import type { Content } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Header } from 'components'
import { useEffect, useState } from 'react'
import { useCopyToClipboard, useLocalStorage } from 'services'
import { useDebouncedCallback } from 'use-debounce'

import './editor.css'

const INITIAL_CONTENT: Content = {
  type: 'doc',
  content: [{ type: 'paragraph' }]
}

export default function Client(): React.ReactElement {
  const [content, setContent] = useLocalStorage<Content>(
    'content',
    INITIAL_CONTENT
  )
  const [saveStatus, setSaveStatus] = useState('Saved')
  const [hydrated, setHydrated] = useState(false)
  const copy = useCopyToClipboard()

  const onUpdate = useDebouncedCallback((editor: Editor) => {
    setSaveStatus('Saving...')
    if (editor) setContent(editor.getJSON())
    setTimeout(() => {
      setSaveStatus('Saved')
    }, 500)
  }, 750)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Type anything...' })
    ],
    editorProps: {
      attributes: {
        class: 'focus:outline-none placeholder:italic'
      }
    },
    onCreate: ({ editor }) => {
      const content = window.localStorage.getItem('content')
      if (content) editor.commands.setContent(JSON.parse(content))
    },
    onUpdate: ({ editor }) => {
      setSaveStatus('Typing...')
      onUpdate(editor)
    },
    autofocus: 'end'
  })

  const onShareLink = async () => {
    const param = btoa(encodeURIComponent(JSON.stringify(content)))
    await copy(`https://dev.dongwook.kim/memo?c=${param}`)
  }

  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content)
      setHydrated(true)
    }
  }, [editor, content, hydrated])
  return (
    <>
      <Header
        title="Memo"
        description="The content is stored in the local storage"
      />
      <div className="min-h-96 pb-80">
        <EditorContent editor={editor} spellCheck={false} />
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="rounded-lg bg-zinc-100 px-2 py-1 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
            {saveStatus}
          </span>
          <button
            onClick={onShareLink}
            className="rounded-lg ring px-2 py-1 dark:ring-zinc-700 dark:text-zinc-400"
          >
            Share link
          </button>
          <button
            onClick={() => {
              editor?.commands.clearContent()
              setContent(INITIAL_CONTENT)
            }}
            className="rounded-lg ring px-2 py-1 dark:ring-zinc-700 dark:text-zinc-400"
          >
            Clear
          </button>
        </div>
      </div>
    </>
  )
}
