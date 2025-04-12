'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import type { Content, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Header } from 'components'
import { useEffect, useState } from 'react'
import { useCopyToClipboard, useLocalStorage } from 'services'
import { useDebouncedCallback } from 'use-debounce'

export default function Client(): React.ReactElement {
  const [content, setContent] = useLocalStorage<Content>('content', {
    type: 'doc',
    content: [{ type: 'paragraph' }]
  })
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
    extensions: [StarterKit],
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
        <div className="prose dark:prose-invert ">
          <EditorContent editor={editor} />
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="rounded-lg bg-stone-100 px-2 py-1 text-stone-400">
            {saveStatus}
          </span>
          <button
            onClick={onShareLink}
            className="rounded-lg border px-2 py-1 text-stone-500"
          >
            Share link
          </button>
          <button
            onClick={() => editor?.commands.clearContent()}
            className="rounded-lg border px-2 py-1 text-stone-500"
          >
            Clear
          </button>
        </div>
      </div>
    </>
  )
}
