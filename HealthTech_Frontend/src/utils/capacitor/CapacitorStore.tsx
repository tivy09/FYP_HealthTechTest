import { Storage } from '@capacitor/storage'

export async function setToken(token: any) {
  if (token === undefined || token === null) return
  await Storage.set({
    key: 'Token',
    value: token,
  })
}

export async function getToken(key: string) {
  const ret = await Storage.get({ key: key })
  return ret.value
}

export async function removeToken(key: string) {
  // console.log(`keys ${JSON.stringify(await Storage.keys())}`)
  await Storage.remove({ key })
}
