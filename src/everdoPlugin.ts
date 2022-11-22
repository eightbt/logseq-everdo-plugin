import { getUrlForBlock } from './util'
import { BlockEntity } from '@logseq/libs/dist/LSPlugin'

export const sendBlockToEverdo = async (block: BlockEntity) => {
  // Pre-flight: configured correctly?
  const apiHostname = logseq.settings?.apiHostname as string
  const apiPort = logseq.settings?.apiPort as string
  const apiKey = logseq.settings?.apiKey as number
  if (!apiHostname) {
    await logseq.UI.showMsg('Everdo IP/Host is not configured', 'error')
    return
  }
  if (!apiPort) {
    await logseq.UI.showMsg('Everdo Port is not configured', 'error')
    return
  }
  if (!apiKey) {
    await logseq.UI.showMsg('Everdo API Key is not configured', 'error')
    return
  }

  // Marshal info
  const blockContent = block.content.trim()
  const blockUuid = block.uuid
  const endpoint = `https://${apiHostname}:${apiPort}`
  const url = `${endpoint}/api/items?key=${apiKey}`
  const payload = {
    title: blockContent,
    note: await getUrlForBlock(block),
  }

  // Do the API call
  const msgKey = await logseq.UI.showMsg('Sending to Everdo', 'success', {
    timeout: 0,
  })
  try {
    const res = await fetch(url, {
      body: JSON.stringify(payload),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // agent: agent,
    })
    if (res.status === 200) {
      await logseq.Editor.updateBlock(blockUuid, blockContent + ' #everdo')
    } else {
      await logseq.UI.showMsg(
        `Could not sync to Everdo
${res.status} - ${res.statusText}`,
        'error'
      )
    }
  } catch (e) {
    await logseq.UI.showMsg(`Could not connect to ${endpoint}`, 'error')
  }
  logseq.UI.closeMsg(msgKey)
}
