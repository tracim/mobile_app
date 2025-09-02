
export async function getB64Favicon(serverURL) {
  let response = await fetch(
    `https://${serverURL}/assets/branding/images/favicon/apple-touch-icon.png`,
    {method: 'GET'}
  )

  if (response.status !== 200) {
    // INFO - CH - 2025-09-01 - Fallback for tracim version < 2025.10.0
    response = await fetch(
      `https://${serverURL}/assets/branding/images/favicon/tracim-64x64.png`,
      {method: 'GET'}
    )
  }

  if (response.status !== 200) {
    return ''
  }

  const arrayBuffer = await response.arrayBuffer()
  const bytes = new Uint8Array(arrayBuffer)

  const binary = bytes.reduce((acc, b) => acc + String.fromCharCode(b), '')
  const base64String = btoa(binary)

  return `data:image/png;base64,${base64String}`
}
