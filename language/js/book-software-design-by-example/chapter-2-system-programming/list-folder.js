import fs from "fs"

console.log(`[*] start of exeuction`)

const srcDir = process.argv[2]

fs.readdir(srcDir, (err, files) => {
  console.log("[+] running callback")

  if (err) {
    console.error(`[-] error = `, err)
    return
  }

  for (const name of files) {
    console.log(`[+] name = `, name)
  }
})

console.log(`[+] end of execution`)
