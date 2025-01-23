import Markdown from 'react-markdown'

function MarkdownRender({ content }: { content: string }) {
  return <div className="text-pretty"><Markdown remarkPlugins={[]} children={content} /></div>
}

export default MarkdownRender
