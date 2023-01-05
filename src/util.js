export function downloadDataset(csv, filename, mimeType = 'text/csv;charset=utf-8') {
  const fakeLink = document.createElement('a')
  fakeLink.style.display = 'none'
  document.body.appendChild(fakeLink)
  const blob = new Blob([csv], { type: mimeType })
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename)
  } else {
    fakeLink.setAttribute('href', URL.createObjectURL(blob))
    fakeLink.setAttribute('download', filename)
    fakeLink.click()
  }
}
