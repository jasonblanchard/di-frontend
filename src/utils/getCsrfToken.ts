export default function getAuthorizationToken() {
  return document.querySelector("meta[name=csrf-token]")?.getAttribute('content') || '';
}
