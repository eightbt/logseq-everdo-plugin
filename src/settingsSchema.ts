import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin'

export const settingsSchema: SettingSchemaDesc[] = [
  {
    key: 'apiHostname',
    type: 'string',
    title: 'Everdo IP/Hostname',
    description: "Where you're running Everdo",
    default: 'localhost',
  },
  {
    key: 'apiPort',
    type: 'number',
    title: 'Everdo Port',
    description: 'Port number that everdo is running on',
    default: 11111,
  },
  {
    key: 'apiKey',
    type: 'string',
    title: 'Everdo API Key',
    description: 'Your secret key.',
    default: null,
  },
]
