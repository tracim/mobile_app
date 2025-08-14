
export async function getB64Favicon(serverURL) {
  const response = await fetch(
    `https://${serverURL}/assets/branding/images/favicon/tracim-64x64.png`,
    {method: 'GET'}
  )

  const arrayBuffer = await response.arrayBuffer()
  const bytes = new Uint8Array(arrayBuffer)

  const binary = bytes.reduce((acc, b) => acc + String.fromCharCode(b), '')
  const base64String = btoa(binary)

  return `data:image/png;base64,${base64String}`
}
