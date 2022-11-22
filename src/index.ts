import '@logseq/libs'
import { settingsSchema } from './settingsSchema'
import { sendBlockToEverdo } from './everdoPlugin'

const main = () => {
  logseq.useSettingsSchema(settingsSchema)

  logseq.Editor.registerSlashCommand('Send to Everdo', async () => {
    const block = await logseq.Editor.getCurrentBlock()
    if (block) await sendBlockToEverdo(block)
  })

  // logseq.Editor.registerBlockContextMenuItem(
  //     'Send to Everdo',
  //     async ({blockId}) => {
  //         sendBlockToEverdo(await logseq.Editor.getBlock(blockID))
  //     },
  // )
}

logseq.ready(main).catch(console.error)
