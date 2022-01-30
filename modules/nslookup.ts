import { spawnSync } from 'child_process'

const process = (host: string) => {
  let command = spawnSync('nslookup', ['-type=ns', host])

  let output: Promise<string> = new Promise((resolve, reject) => {
    resolve(command.stdout.toString())
    reject(command.stderr.toString())
    reject(command.error?.toString())
  })

  let outputFormat = output
    .then(data => {
      let listPair: Array<string> = []
      let a = data.split(/\n/)
      a.forEach((v, i) => {
        let b = v.split(/\t/)
        b.forEach((v, i) => {
          let c = v.split('=')
          c.forEach((v, i) => {
            let d = v.split(/\s/)
            d.forEach((v, i) => {
              v
                && !v.includes('nameserver')
                && !v.includes('answer:')
                && !v.includes('Non-authoritative')
                && listPair.push(v)
            })
          })
        })
      })

      let server: string | undefined
      let address: string | undefined
      let nameserver: Array<string> = []
      for (let i = 0; i < listPair.length; i += 2) {
        let key = listPair[i]
          .replace(':', '')
          .toLocaleLowerCase()
        let value = listPair[i + 1]

        if (key === 'server')
          server = value

        if (key === 'address')
          address = value

        if (key === host)
          nameserver.push(value)
      }

      let resultObject = {
        name: host,
        server,
        address,
        nameserver
      }
      return resultObject
    })
  return outputFormat
}

export default process
