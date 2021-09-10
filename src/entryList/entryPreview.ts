export default function entryPreview(text: string) {
  return text.split('\n')[0].replace('#', '') || '(untitled)'
}
