import { BlockEntity } from '@logseq/libs/dist/LSPlugin'

export const getUrlForBlock = async (block: BlockEntity) => {
  //TODO: Move into plugin lib
  const graphName = (await logseq.App.getCurrentGraph())?.name as string
  return encodeURI(`logseq://graph/${graphName}?block-id=${block.uuid}`)
}
