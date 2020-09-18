console.log(`env.DB_PATH: ${process.env.DB_PATH}`)
console.log(`env.SECRET_HASH: ${process.env.DB_PATH}`)

module.exports = {
  DB_PATH: process.env.DB_PATH || '/db/shortcuts.db',
  SECRET_HASH: process.env.SECRET_HASH || 'b109f3bbbc244eb82441917ed06d618b9008dd09b3befd1b5e07394c706a8bb980b1d7785e5976ec049b46df5f1326af5a2ea6d103fd07c95385ffab0cacbc86',
  PORT: process.env.PORT || '8080',
  DEVELOPMENT: process.env.DEVELOPMENT === true
}